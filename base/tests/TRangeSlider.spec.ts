import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import TRangeSlider from "../components/TRangeSlider.vue";

describe("TRangeSlider test", () => {
  it("rangeSlider with cover minValue < min", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const wrapper = mount(TRangeSlider, {
      propsData: {
        min: 10,
        max: 90,
        minValue: 5,
      },
    });
    expect(error).toBeCalledWith("t-range-slider : minValue is out of range");
  });
  // ********************************
  it("rangeSlider with cover maxValue > max", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const wrapper = mount(TRangeSlider, {
      propsData: {
        min: 10,
        max: 90,
        maxValue: 100,
      },
    });
    expect(error).toBeCalledWith("t-range-slider : maxvalue is out of range");
  });
  // ********************************
  it("rangeSlider with cover min = max", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const wrapper = mount(TRangeSlider, {
      propsData: {
        min: 10,
        max: 10,
      },
    });
    expect(error).toBeCalledWith(
      "t-range-slider : range area is invalid min and max are equal"
    );
  });
  // ********************************
  it("rangeSlider with cover min > max", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const wrapper = mount(TRangeSlider, {
      propsData: {
        min: 100,
        max: 10,
      },
    });
    expect(error).toBeCalledWith(
      "t-range-slider : range area is invalid max is bigger than min"
    );
  });
  // ********************************
  it("updates minValue correctly on click", async () => {
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      configurable: true,
      value: 100,
    });
    const wrapper = mount(TRangeSlider, {
      propsData: {
        min: 0,
        max: 100,
        minValue: 20,
        maxValue: 80,
      },
    });
    const rect = wrapper
      .find('[data-name="container"]')
      .element.getBoundingClientRect();
    const clickX = rect.left + 50;
    wrapper
      .find('[data-name="container"]')
      .trigger("click", { clientX: clickX });

    expect(wrapper.emitted("update:minValue")).toBeDefined();
    expect(wrapper.emitted("update:minValue")![0][0]).toBe(50);
  });
  // ********************************
  it("updates maxValue correctly on click", async () => {
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      configurable: true,
      value: 100,
    });
    const wrapper = mount(TRangeSlider, {
      propsData: {
        min: 0,
        max: 100,
        minValue: 20,
        maxValue: 80,
      },
    });

    const container = wrapper.find('[data-name="container"]');
    const rect = container.element.getBoundingClientRect();
    const clickX = rect.left + 80;

    container.trigger("click", { clientX: clickX });

    expect(wrapper.emitted("update:maxValue")).toBeDefined();
    expect(wrapper.emitted("update:maxValue")![0][0]).toBe(80);
  });
  // ********************************
  it("updates minValue correctly on click when min is enabled and max is disabled", async () => {
    const wrapper = mount(TRangeSlider, {
      propsData: {
        min: 0,
        max: 100,
        minValue: 20,
        maxValue: 80,
        disableMin: false,
        disableMax: true,
      },
    });

    expect(wrapper.find('[data-name="maxCircle"]').exists()).toBeFalsy();

    const container = wrapper.find('[data-name="container"]');
    const rect = container.element.getBoundingClientRect();

    const clickX = rect.left + 50;
    container.trigger("click", { clientX: clickX });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("update:minValue")).toBeDefined();
    expect(wrapper.emitted("update:minValue")![0][0]).toBe(50);
  });
  // ********************************
  it("updates maxValue correctly on click when max is enabled and min is disabled", async () => {
    const wrapper = mount(TRangeSlider, {
      propsData: {
        min: 0,
        max: 100,
        minValue: 20,
        maxValue: 80,
        disableMin: true,
        disableMax: false,
      },
    });

    expect(wrapper.find('[data-name="minCircle"]').exists()).toBeFalsy();

    const container = wrapper.find('[data-name="container"]');
    const rect = container.element.getBoundingClientRect();

    const clickX = rect.left + 80;
    container.trigger("click", { clientX: clickX });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("update:maxValue")).toBeDefined();
    expect(wrapper.emitted("update:maxValue")![0][0]).toBe(80);
  });
  //*********************************
  it("renders content in minCircle slot when min circle is enabled", () => {
    const wrapper = mount(TRangeSlider, {
      props: {
        min: 0,
        max: 100,
        minValue: 20,
        maxValue: 80,
        disableMin: false,
        disableMax: false,
      },
      slots: {
        "min-inner": '<div class="slot-content">Min Inner Slot Content</div>',
      },
    });

    const minCircle = wrapper.find('[data-name="minCircle"]');
    const slotContent = minCircle.find(".slot-content");

    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe("Min Inner Slot Content");
  });
  //*********************************
  it("renders content in maxCircle slot when max circle is enabled", () => {
    const wrapper = mount(TRangeSlider, {
      props: {
        min: 0,
        max: 100,
        minValue: 20,
        maxValue: 80,
        disableMin: false,
        disableMax: false,
      },
      slots: {
        "max-inner": '<div class="slot-content">Max Inner Slot Content</div>',
      },
    });

    const maxCircle = wrapper.find('[data-name="maxCircle"]');
    const slotContent = maxCircle.find(".slot-content");

    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe("Max Inner Slot Content");
  });
  //*********************************
  it("test variant prop", async () => {
    const wrapper = mount(TRangeSlider, {
      propsData: {
        variant: "success",
      },
    });
    expect(wrapper.get('[data-name="activePan"]').classes("bg-success")).toBe(
      true
    );
    expect(wrapper.get('[data-name="minCircle"]').classes("bg-success")).toBe(
      true
    );
    expect(wrapper.get('[data-name="maxCircle"]').classes("bg-success")).toBe(
      true
    );

    await wrapper.setProps({ variant: "danger" });
    expect(wrapper.get('[data-name="activePan"]').classes("bg-danger")).toBe(
      true
    );
    expect(wrapper.get('[data-name="minCircle"]').classes("bg-danger")).toBe(
      true
    );
    expect(wrapper.get('[data-name="maxCircle"]').classes("bg-danger")).toBe(
      true
    );
  });
});

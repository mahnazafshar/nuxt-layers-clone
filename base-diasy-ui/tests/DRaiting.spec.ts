import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DRating from "../components/DRating.vue";

describe("test DRating", () => {
  it("test iconClass", async () => {
    const wrapper = mount(DRating);

    wrapper.findAll('[data-name="icon"]').forEach((icon) => {
      expect(icon.classes()).toContain("mask-star");
    });
    await wrapper.setProps({ iconClass: "custom-icon-class" });
    wrapper.findAll('[data-name="icon"]').forEach((icon) => {
      expect(icon.classes()).toContain("custom-icon-class");
    });
  });
  it("should render without half stars when useHalfStars is false", () => {
    const wrapper = mount(DRating, {
      propsData: {
        useHalfStars: false,
        totalStars: 5,
        name: "rating",
        selectedRating: 3,
      },
    });
    expect(wrapper.find('[data-name="container"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-name="icon"]').length).toBe(5);
    expect(wrapper.findAll('[data-name="halfIcon"]').length).toBe(0);
  });
  it("should render with half stars when useHalfStars is true", () => {
    const wrapper = mount(DRating, {
      propsData: {
        useHalfStars: true,
        totalStars: 5,
        name: "rating",
        selectedRating: 3.5,
      },
    });
    expect(wrapper.find('[data-name="container"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-name="icon"]').length).toBe(0);
    expect(wrapper.findAll('[data-name="halfIcon"]').length).toBe(10);
  });
  it("should set the initial selectedRating based on modelValue prop", async () => {
    const wrapper = mount(DRating, {
      propsData: {
        modelValue: 3,
      },
    });
    expect(wrapper.findAll('input[type="radio"]').at(3).element.checked).toBe(
      true
    );

    await wrapper.setProps({ modelValue: 4 });
    expect(wrapper.findAll('input[type="radio"]').at(4).element.checked).toBe(
      true
    );
  });

  it("should emit 'update:modelValue' when selectedRating changes", async () => {
    const wrapper = mount(DRating);

    const selectedInput = wrapper.findAll('input[type="radio"]').at(3);
    await selectedInput.setChecked();
    await selectedInput.trigger("click");
    expect(selectedInput.element.checked).toBeTruthy();

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("update:modelValue")[0][0]).toBe(3);
  });

  it("should update selectedRating when clicking on stars without half stars", async () => {
    const wrapper = mount(DRating, {
      propsData: {
        name: "test-rating",
        totalStars: 5,
        useHalfStars: false,
        iconClass: "test-icon",
        modelValue: 3,
      },
    });

    expect(wrapper.find('[data-name="container"]').classes()).toContain(
      "rating"
    );
    expect(wrapper.findAll('[data-name="halfIcon"]').length).toBe(0);
    expect(wrapper.findAll('[data-name="icon"]').length).toBe(5);
    const radioInput = wrapper.findAll('input[type="radio"]').at(2);
    await radioInput.setChecked();
    await radioInput.trigger("click");

    expect(radioInput.element.checked).toBeTruthy();
    expect(wrapper.vm.selectedRating).toBe(2);

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0][0]).toEqual(2);
  });

  it("reset input should update selectedRating with v-model binding", async () => {
    const wrapper = mount(DRating, {
      propsData: {
        name: "test-rating",
        totalStars: 5,
        useHalfStars: false,
        iconClass: "test-icon",
        modelValue: 3,
      },
    });

    expect(wrapper.vm.selectedRating).toBe(3);

    const resetInput = wrapper.find('[data-name="reset"]');
    expect(resetInput.exists()).toBe(true);

    await resetInput.trigger("click");
    await wrapper.vm.$nextTick();

    const emittedEvents = wrapper.emitted("update:modelValue");
    console.log(emittedEvents);

    expect(emittedEvents).toBeDefined();
    expect(emittedEvents![0][0]).toBe(0);
  });
});

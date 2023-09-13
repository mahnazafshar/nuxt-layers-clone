import { describe, test, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VRadio from "../components/VRadio.vue";

describe("test VRadio", () => {
  test("with props", () => {
    const wrapper = mount(VRadio, {
      props: {
        name: "with-label",
        label: "radioLabel",
        color: VRadioColor.accent,
        size: VRadioSize.sm,
        successMessage: "successMsg",
      },
    });
    expect(wrapper.find('[data-name="label"]').text()).toBe("radioLabel");
    expect(wrapper.find('[data-name="messageSpan"]').text()).toBe("successMsg");
    const inputEl = wrapper.get('[data-name="input"]');
    expect(inputEl.classes("radio-accent")).toBe(true);
    expect(inputEl.classes("radio-sm")).toBe(true);
  });

  // ******************************
  test("with slots", () => {
    const wrapper = mount(VRadio, {
      props: {
        name: "with-slots",
        label: "text-props-label",
      },
      slots: {
        leftLabel: "<span data-name='test-icon-label'>iconLabel</span>",
        label:
          "<span data-name='test-slot-label' class='slot-class'>slot-label</span>",
      },
    });
    expect(
      wrapper.find('[data-name="test-slot-label"]').classes("slot-class")
    ).toBe(true);
    expect(wrapper.find('[data-name="test-slot-label"]').text()).toBe(
      "slot-label"
    );
    expect(wrapper.find('[data-name="test-slot-label"]').text()).not.toBe(
      "text-props-label"
    );

    expect(wrapper.find('[data-name="test-icon-label"]').text()).toBe(
      "iconLabel"
    );
  });
  // *************************************
  test("set modelValue", async () => {
    const wrapper = mount(VRadio, {
      props: {
        name: "with modelValue",
        modelValue: false,
        useModelValue: true,
        label: "has Work ?",
      },
    });
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][1]).toEqual([true]);
    expect(wrapper.emitted()["update:modelValue"]).toHaveLength(2);
  });
  // **********************************
  test("set disabled", async () => {
    const wrapper = mount(VRadio, {
      props: {
        name: "name of radio",
        modelValue: false,
        useModelValue: true,
        label: "has Work ?",
        disabled: true,
      },
    });
    expect(wrapper.emitted()["update:modelValue"]).toHaveLength(1);
    await wrapper.find('[data-name="input"]').setValue(true);
    expect(wrapper.emitted()["update:modelValue"]).toHaveLength(1);
    expect(wrapper.vm.checked).toBe(false);
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.vm.checked).toBe(true);
  });
  // *********************************
  test("with value", async () => {
    const wrapper = mount(VRadio, {
      props: {
        name: "withValue",
        value: "coffee",
        modelValue: "coffee",
        useModelValue: true,
      },
    });

    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["coffee"]);
    expect(wrapper.vm.checked).toEqual(true);
    await wrapper.setProps({ modelValue: "tea" });
    expect(wrapper.emitted()["update:modelValue"][1]).toEqual(["tea"]);
    expect(wrapper.vm.checked).toEqual(false);
  });
  // *****************************************
});

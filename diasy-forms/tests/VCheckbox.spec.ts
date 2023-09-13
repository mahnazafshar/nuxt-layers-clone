import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VCheckbox from "../components/VCheckbox.vue";

describe("test VCheckbox", () => {
  test("set props", () => {
    const wrapper = mount(VCheckbox, {
      props: {
        name: "withProps",
        label: "labelForTest",
        color: VCheckboxColor.info,
        size: VCheckboxSize.lg,
        successMessage: "this is a successMessage",
      },
    });

    expect(wrapper.find('[data-name="labelContainer"]').text()).toBe(
      "labelForTest"
    );

    expect(wrapper.find('[data-name="messageSpan"]').text()).toBe(
      "this is a successMessage"
    );
    const inputEl = wrapper.get('[data-name="input"]');
    expect(inputEl.classes("checkbox-info")).toBe(true);
    expect(inputEl.classes("checkbox-lg")).toBe(true);
    expect(true).toBe(true);
  });
  // **************************************
  test("with slots", () => {
    const wrapper = mount(VCheckbox, {
      slots: {
        leftLabel: "<span data-name='icon-label'>iconLabel</span>",
        label:
          "<span data-name='test-slot-label' class='slot-class'>slot-label</span>",
      },
      props: {
        name: "slots",
        label: "props-label",
      },
    });

    expect(
      wrapper.get('[data-name="labelContainer"]').classes("label-text")
    ).toBe(false);
    expect(
      wrapper.find('[data-name="test-slot-label"]').classes("slot-class")
    ).toBe(true);
    expect(wrapper.find('[data-name="icon-label"]').text()).toBe("iconLabel");
  });
  // **************************************
  test("set modelValue", async () => {
    const wrapper = mount(VCheckbox, {
      props: {
        name: "set-model-value",
        modelValue: false,
        useModelValue: true,
        label: "has work ?",
      },
    });
    await wrapper.setProps({ modelValue: true });
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][1]).toEqual([true]);
    expect(wrapper.emitted()["update:modelValue"]).toHaveLength(2);
    await wrapper.setProps({ disabled: true });
    await wrapper.find('[data-name="input"]').setValue(false);
    expect(wrapper.emitted()["update:modelValue"]).toHaveLength(2);
  });
  // *************************************

  test("with checkedValue-unCheckedValue", async () => {
    const wrapper = mount(VCheckbox, {
      props: {
        name: "withCheckedValue",
        checkedValue: "hi",
        uncheckedValue: "bye",
        modelValue: "hi",
        useModelValue: true,
      },
    });

    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["hi"]);
    expect(wrapper.vm.checked).toEqual(true);
    await wrapper.setProps({ modelValue: "bye" });
    expect(wrapper.emitted()["update:modelValue"][1]).toEqual(["bye"]);
    expect(wrapper.vm.checked).toEqual(false);
  });

  // *****************************************
  test("with arrayModelValue", async () => {
    const wrapper = mount(VCheckbox, {
      props: {
        name: "with-array-model",
        checkedValue: "hi",
        uncheckedValue: "bye",
        modelValue: ["hi", "bye"],
        useModelValue: true,
      },
    });
    expect(wrapper.vm.checked).toEqual(true);
    const checkboxEl = wrapper.find('[data-name="input"]');
    await checkboxEl.setValue(false);
    expect(wrapper.emitted()["update:modelValue"][1]).toEqual([["bye"]]);
  });
  // ******************************************
  test("with toggle", () => {
    const wrapper = mount(VCheckbox, {
      props: {
        toggle: true,
        name: "with-toggle",
        label: "test toggle",
        size: VCheckboxSize.sm,
        color: VCheckboxColor.error,
      },
    });
    expect(wrapper.find('[data-name="input"]').classes("toggle")).toBe(true);
    expect(wrapper.find('[data-name="input"]').classes("toggle-sm")).toBe(true);
    expect(wrapper.find('[data-name="input"]').classes("toggle-error")).toBe(
      true
    );
  });
  // **************************************
});

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import VSelect from "../components/VSelect.vue";

describe("VSelect", () => {
  it("renders placeholder when provided", () => {
    const placeholder = "Select an option";
    const wrapper = mount(VSelect, {
      propsData: {
        name: "test",
        placeholder,
      },
    });
    const placeholderOption = wrapper.find('[data-name="placeholder"]');
    expect(placeholderOption.text()).toBe(placeholder);
  });
  it("renders the label when provided", () => {
    const wrapper = mount(VSelect, {
      propsData: {
        name: "test",
        label: "Select an option",
      },
    });
    const labelSpan = wrapper.find('[data-name="label"]');
    expect(labelSpan.text()).toBe("Select an option");
  });
  it("test props: color, size, successMessage", () => {
    const wrapper = mount(VSelect, {
      propsData: {
        name: "test",
        color: VSelectColor.info,
        size: VSelectSize.lg,
        successMessage: "success",
      },
    });
    const selectInput = wrapper.get('[data-name="select"]');
    expect(selectInput.classes("select-info")).toBe(true);
    expect(selectInput.classes("select-lg")).toBe(true);
    expect(wrapper.find('[data-name="messageSpan"]').text()).toBe("success");
  });
  it("renders options correctly without disabled attribute", () => {
    const items = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ];
    const wrapper = mount(VSelect, {
      propsData: {
        name: "test",
        items,
      },
    });

    const options = wrapper.findAll('[data-name="option"]');
    expect(options).toHaveLength(items.length);

    items.forEach((item, index) => {
      const option = options[index];
      expect(option.text()).toBe(item.label);
      expect(option.attributes("value")).toBe(item.value);
      expect(option.element.hasAttribute("disabled")).toBe(false);
    });
  });
  it("renders options correctly with disabled attribute", () => {
    const items = [
      { label: "Option 1", value: "option1", disabled: false },
      { label: "Option 2", value: "option2", disabled: false },
      { label: "Option 3", value: "option3", disabled: true },
    ];
    const wrapper = mount(VSelect, {
      propsData: {
        name: "test",
        items,
      },
    });

    const options = wrapper.findAll('[data-name="option"]');
    expect(options).toHaveLength(items.length);

    items.forEach((item, index) => {
      const option = options[index];
      expect(option.text()).toBe(item.label);
      expect(option.attributes("value")).toBe(item.value);
      expect(option.element.hasAttribute("disabled")).toBe(item.disabled);
    });
  });
  it("transforms items correctly into objects with label and value properties", () => {
    const items = ["Option 1", "Option 2", "Option 3"];
    const wrapper = mount(VSelect, {
      propsData: {
        name: "test",
        items,
      },
    });

    const options = wrapper.findAll('[data-name="option"]');
    expect(options).toHaveLength(items.length);

    items.forEach((item, index) => {
      const option = options[index];
      expect(option.text()).toBe(item);
      expect(option.attributes("value")).toBe(item);
    });
  });
  it("renders options correctly using custom labelField and valueField", () => {
    const customLabelField = "name";
    const customValueField = "code";

    const items = [
      { name: "Option 1 Name", code: "option1", disabled: false },
      { name: "Option 2 Name", code: "option2", disabled: false },
      { name: "Option 3 Name", code: "option3", disabled: true },
    ];

    const wrapper = mount(VSelect, {
      propsData: {
        items,
        labelField: customLabelField,
        valueField: customValueField,
      },
    });

    const options = wrapper.findAll('[data-name="option"]');
    expect(options).toHaveLength(items.length);

    items.forEach((item, index) => {
      const option = options[index];
      expect(option.text()).toBe(item[customLabelField]);
      expect(option.attributes("value")).toBe(item[customValueField]);
      expect(option.element.hasAttribute("disabled")).toBe(item.disabled);
    });
  });
  it("renders label container with label and leftLabel slot when label is provided", () => {
    const labelContent = "Select an option";
    const wrapper = mount(VSelect, {
      propsData: {
        name: "test",
        label: labelContent,
      },
      slots: {
        leftLabel: "<span data-name='icon-label'>iconLabel</span>",
      },
    });

    const labelContainer = wrapper.find('[data-name="labelContainer"]');
    const labelElement = labelContainer.find('[data-name="label"]');
    const leftLabelSlot = labelContainer.find('[data-name="leftLabel"]');

    expect(labelContainer.exists()).toBe(true);
    expect(labelElement.exists()).toBe(true);
    expect(labelElement.text()).toBe(labelContent);
    expect(wrapper.find('[data-name="icon-label"]').text()).toBe("iconLabel");
  });
  it("updates modelValue when an option is selected", async () => {
    const items = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ];
    const wrapper = mount(VSelect, {
      propsData: {
        name: "set-model-value",
        label: "label",
        items,
        modelValue: "option2",
      },
    });
    const selectElement = wrapper.find('[data-name="select"]');
    expect(selectElement.element.value).toBe("option2");
  });
  it("updates modelValue when an option isn't selected", async () => {
    const items = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ];
    const wrapper = mount(VSelect, {
      propsData: {
        name: "set-model-value",
        label: "label",
        items,
      },
    });

    const selectElement = wrapper.find('[data-name="select"]');
    await selectElement.setValue("option2");
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][1]).toEqual(["option2"]);
  });
  it("updates modelValue when an option is selected and check DOM", async () => {
    const items = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ];
    const wrapper = mount(VSelect, {
      propsData: {
        name: "set-model-value",
        label: "label",
        items,
      },
    });

    await wrapper.setProps({ modelValue: "option3" });
    const selectElement = wrapper.find('[data-name="select"]');
    expect(selectElement.element.value).toBe("option3");
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][1]).toEqual(["option3"]);
  });
});

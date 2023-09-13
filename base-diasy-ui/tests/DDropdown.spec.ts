import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DDropdown from "../components/DDropdown.vue";

describe("test DDropdown", () => {
  it("test parentTag 'ul' if prop parentTag is not provided and custom tag if prop parentTag is provided", async () => {
    const wrapper = mount(DDropdown);

    expect(wrapper.find("[data-name='parentTag']").exists()).toBe(true);
    expect(
      wrapper.find("[data-name='parentTag']").element.tagName.toLowerCase()
    ).toBe("ul");
    await wrapper.setProps({ parentTag: "div" });
    expect(
      wrapper.find("[data-name='parentTag']").element.tagName.toLowerCase()
    ).toBe("div");
  });
  it("test childTag 'li' if prop childTag is not provided and custom tag if prop childTag is provided", async () => {
    const wrapper = mount(DDropdown);

    expect(wrapper.vm.getChildTag).toBe("li");
    await wrapper.setProps({ childTag: "div" });
    expect(wrapper.vm.getChildTag).toBe("div");
  });
  it("should render child tags based on the 'items' prop", () => {
    const items = ["Item 1", "Item 2", "Item 3"];
    const wrapper = mount(DDropdown, {
      propsData: {
        items: items,
      },
    });

    const childTags = wrapper.findAll("[data-name='childTag']");
    expect(childTags).toHaveLength(items.length);

    items.forEach((item, index) => {
      expect(childTags[index].text()).toBe(item);
    });
  });
  it("test parentClass prop", async () => {
    const wrapper = mount(DDropdown);
    await wrapper.setProps({ parentClass: "m-8" });
    expect(wrapper.find('[data-name="parentTag"]').classes("m-8")).toBe(true);
  });
  it("test prop hover", async () => {
    const wrapper = mount(DDropdown);

    expect(
      wrapper.get('[data-name="container"]').classes("dropdown-hover")
    ).toBe(false);

    await wrapper.setProps({ hover: true });
    expect(
      wrapper.get('[data-name="container"]').classes("dropdown-hover")
    ).toBe(true);
  });
  it("should emit 'update:modelValue'  when modelValue is changed", async () => {
    const wrapper = mount(DDropdown);
    expect(wrapper.vm.$props.modelValue).toBe(false);

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([true]);
    expect(wrapper.find("[data-name='parentTag']").exists()).toBe(true);
  });
  it("should render trigger slot", () => {
    const wrapper = mount(DDropdown, {
      slots: {
        trigger: "Click me!",
      },
    });

    expect(wrapper.text()).toContain("Click me!");
  });
});

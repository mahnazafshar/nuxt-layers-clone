import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DCollapsible from "../components/DCollapsible.vue";

describe("test DCollapsible", () => {
  it("set props: title-content-titleClass-contentClass-canToggle-hasArrow-hasPlus", async () => {
    const wrapper = mount(DCollapsible, {
      propsData: {
        title: "collapse title",
        content: "collapse content",
        titleClass: "bg-primary",
        contentClass: "text-secondary",
      },
    });
    const title = wrapper.find('[data-name="title"]');
    const content = wrapper.find('[data-name="content"]');

    expect(title.text()).toContain("collapse title");
    expect(content.text()).toContain("collapse content");

    expect(title.classes("bg-primary")).toBe(true);
    expect(content.classes("text-secondary")).toBe(true);

    // set hasArrow props
    await wrapper.setProps({ hasArrow: true });
    expect(
      wrapper.find('[data-name="container"]').classes("collapse-arrow")
    ).toBe(true);

    // set hasPlus props
    await wrapper.setProps({ hasArrow: false, hasPlus: true });
    expect(
      wrapper.find('[data-name="container"]').classes("collapse-plus")
    ).toBe(true);

    // set canToggle false
    await wrapper.setProps({ canToggle: false });
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(false);
  });

  // *********************************************************************************************

  it("with slot", () => {
    const wrapper = mount(DCollapsible, {
      slots: {
        title: "title slot",
        content:
          '<div class="bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">content slot</div>',
      },
      props: {
        title: "props-title",
        content: "props-content",
      },
    });
    const content = wrapper.find('[data-name="content"] > div');

    expect(wrapper.text()).toContain("title slot");
    expect(wrapper.text()).toContain("content slot");
    expect(content.classes("bg-primary")).toBe(true);
    wrapper.find('input[type="checkbox"]').setValue(true);
  });

  // *********************************************
  it("test hasAnimation-forceOpen-forceClose", async () => {
    const wrapper = mount(DCollapsible, {
      propsData: {
        hasAnimation: false,
        forceOpen: true,
      },
    });
    expect(wrapper.find("details").exists()).toBe(true);
    expect(wrapper.find("summary").exists()).toBe(true);
    expect(wrapper.classes("collapse-open")).toBe(true);
    await wrapper.setProps({ forceOpen: false, forceClose: true });
    expect(wrapper.classes("collapse-close")).toBe(true);
  });

  // **************************************************
  it("test with VModel", async () => {
    const wrapper = mount(DCollapsible, {
      propsData: {
        title: "title 1",
        content: "content",
        modelValue: true,
      },
    });

    const inputCheckbox = wrapper.find('input[type="checkbox"]');

    expect(inputCheckbox.element.checked).toBe(true);
    await wrapper.setProps({ modelValue: false });
    expect(inputCheckbox.element.checked).toBe(false);
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([false]);
  });
});

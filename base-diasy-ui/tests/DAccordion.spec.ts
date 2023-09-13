import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DAccordion from "../components/DAccordion.vue";

describe("test DAccordion", () => {
  it("test with props items-name-titleClass-contentClass-containerClass-containerClass-isJoin-forceOpen-forceClose-toggleWithHeader", async () => {
    const wrapper = mount(DAccordion, {
      propsData: {
        items: [
          { title: " first title", content: "first content" },
          { title: " second title", content: " second content" },
        ],
        name: "accordion-test",
        titleClass: "bg-primary",
        contentClass: "text-secondary",
        containerClass: "p-2",
        wrapperClass: "m-3",
      },
    });

    // console.log("Accordion wrapper11", wrapper.html());

    expect(wrapper.find('[data-name="container"]').classes("m-3")).toBe(true);
    expect(wrapper.find('[data-name="innerContainer"]').classes("p-2")).toBe(
      true
    );
    expect(wrapper.find('[data-name="title"]').classes("bg-primary")).toBe(
      true
    );
    expect(
      wrapper.find('[data-name="content"]').classes("text-secondary")
    ).toBe(true);

    //set isJoin
    await wrapper.setProps({ isJoin: true });
    expect(wrapper.get('[data-name="container"]').classes("join")).toBe(true);
    expect(
      wrapper.get('[data-name="innerContainer"]').classes("join-item")
    ).toBe(true);

    // set forceClose
    await wrapper.setProps({ forceClose: true });
    expect(
      wrapper.get('[data-name="innerContainer"]').classes("collapse-close")
    ).toBe(true);

    // set forceOpen
    await wrapper.setProps({ forceOpen: true });
    expect(
      wrapper.get('[data-name="innerContainer"]').classes("collapse-open")
    ).toBe(true);
    await wrapper.setProps({ forceOpen: false });

    const firstInputRadioBox = wrapper.findAll('input[type="radio"]')[0];

    // check with toggleWithHeader=true
    await firstInputRadioBox.trigger("click");
    expect(firstInputRadioBox.element.checked).toBe(true);
    await firstInputRadioBox.trigger("click");
    expect(firstInputRadioBox.element.checked).toBe(false);

    // set toggleWithHeader=false and check
    await wrapper.setProps({ toggleWithHeader: false });
    await firstInputRadioBox.trigger("click");
    expect(firstInputRadioBox.element.checked).toBe(true);
    await firstInputRadioBox.trigger("click");
    expect(firstInputRadioBox.element.checked).toBe(true);
  });

  // **************************************************************

  it("test slot-hasArrow and hasPlus props", async () => {
    const wrapper = mount(DAccordion, {
      propsData: {
        items: [{ title: " first title", content: "first content" }],
        name: "accordion-slot",
        hasArrow: true,
        title: "props-title",
        content: "props-content",
      },
      slots: {
        title: '<div class="customTitle">title</div>',
        content: "<div>custom Content</div>",
      },
    });
    expect(
      wrapper.get('[data-name="title"] > div').classes("customTitle")
    ).toBe(true);

    expect(wrapper.get('[data-name="title"] > div').text()).toBe("title");

    expect(wrapper.get('[data-name="content"]').text()).toBe("custom Content");
    expect(
      wrapper.get('[data-name="innerContainer"]').classes("collapse-arrow")
    ).toBe(true);
    expect(
      wrapper.get('[data-name="innerContainer"]').classes("collapse-plus")
    ).toBe(false);
    await wrapper.setProps({ hasArrow: false });
    await wrapper.setProps({ hasPlus: true });
    expect(
      wrapper.get('[data-name="innerContainer"]').classes("collapse-plus")
    ).toBe(true);
    // wrapper.vm.clickToggle();
  });
  // ********************************
  it("test v-Model", async () => {
    const wrapper = mount(DAccordion, {
      propsData: {
        items: [
          { title: " first title", content: "first content" },
          { title: " second title", content: " second content" },
          { title: " third title", content: " third content" },
        ],
        name: "test-with-model-value",
        modelValue: 1,
      },
    });

    const firstInputRadioBox = wrapper.findAll('input[type="radio"]')[0];
    const secondInputRadioBox = wrapper.findAll('input[type="radio"]')[1];
    const lastInputRadioBox = wrapper.findAll('input[type="radio"]')[2];

    expect(secondInputRadioBox.element.checked).toBe(true);

    //change modelValue
    await wrapper.setProps({ modelValue: 2 });
    expect(secondInputRadioBox.element.checked).toBe(false);
    expect(lastInputRadioBox.element.checked).toBe(true);
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([2]);

    //click on item in DOM
    await firstInputRadioBox.trigger("click");
    expect(firstInputRadioBox.element.checked).toBe(true);
    expect(lastInputRadioBox.element.checked).toBe(false);
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][1]).toEqual([0]);

    // console.log("model value is ::", wrapper.props().modelValue);
  });
});

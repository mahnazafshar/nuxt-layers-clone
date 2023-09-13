import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import DAlert from "../components/DAlert.vue";

describe("DAlert", () => {
  it("alert with the specified variant class when variant prop is provided", async () => {
    const wrapper = mount(DAlert, {
      propsData: {
        text: "TestAlertText",
        variant: "info",
      },
    });
    expect(wrapper.element.className.includes("alert-info")).toBe(true);

    await wrapper.setProps({ variant: "success" });
    expect(wrapper.element.className.includes("alert-success")).toBe(true);

    await wrapper.setProps({ variant: "warning" });
    expect(wrapper.element.className.includes("alert-warning")).toBe(true);

    await wrapper.setProps({ variant: "error" });
    expect(wrapper.element.className.includes("alert-error")).toBe(true);

    expect(wrapper.find('[data-name="text"]').text()).toBe("TestAlertText");
  });

  it("renders the slot content", () => {
    const wrapper = mount(DAlert, {
      propsData: {
        text: "TextProp",
      },
      slots: {
        text: "<div>Test Text</div>",
      },
    });

    expect(wrapper.find('[data-name="text"]').text()).not.toBe("TextProp");
    expect(wrapper.find("[data-name='text']").text()).toBe("Test Text");
  });

  it("alert with the provided text prop", async () => {
    const wrapper = mount(DAlert, { propsData: { text: "Test Alert" } });

    expect(wrapper.find('[data-name="text"]').text()).toBe("Test Alert");
  });

  it("the appropriate icon based on the variant prop", async () => {
    const wrapper = mount(DAlert, {
      propsData: {
        variant: "info",
      },
    });

    expect(wrapper.find('[data-test="info-icon"]').exists()).toBe(true);

    await wrapper.setProps({ variant: "success" });
    expect(wrapper.find('[data-test="success-icon"]').exists()).toBe(true);

    await wrapper.setProps({ variant: "warning" });
    expect(wrapper.find('[data-test="warning-icon"]').exists()).toBe(true);

    await wrapper.setProps({ variant: "error" });
    expect(wrapper.find('[data-test="error-icon"]').exists()).toBe(true);
  });
});

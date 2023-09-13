import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, shallowMount, RouterLinkStub } from "@vue/test-utils";
import TPagination from "../components/TPagination.vue";
import { useRoute, useRouter } from "vue-router";

vi.mock("vue-router");
describe("test TPagination", () => {
  // **** router mock **********
  useRoute.mockReturnValue({
    query: {
      page: 5,
      pageFilter: 8,
      formPagination: { page: 3 },
    },
  });
  useRouter.mockReturnValue({
    push: vi.fn(),
  });
  beforeEach(() => {
    useRouter().push.mockReset(); // reset the mock between test cases
  });

  // *************************************
  it("withQuery is false-has modelValue and change page", async () => {
    const wrapper = mount(TPagination, {
      propsData: {
        modelValue: 1,
        totalCount: 100,
        perPage: 10,
        colorClass: "bg-secondary",
        withQuery: false,
        variant: "secondary",
      },
    });

    const elementPage1 = wrapper.find(
      '[data-name="pagination-li"] > [data-test-id="page-1"] > span'
    );

    expect(elementPage1.classes("bg-secondary")).toBe(true);

    const elementPage2 = wrapper.find(
      '[data-name="pagination-li"] > [data-test-id="page-2"]'
    );
    expect(elementPage2.text()).toEqual("2");

    await elementPage2.trigger("click");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([2]);

    await wrapper.setProps({ modelValue: 10 });

    expect(wrapper.vm.getModelValue).toEqual(10);
    const elementPage10 = wrapper.find(
      '[data-name="pagination-li"] > [data-test-id="page-10"] > span'
    );
    expect(elementPage10.classes("bg-secondary")).toBe(true);
  });

  // **********************************************
  it("with slots", async () => {
    const wrapper = mount(TPagination, {
      propsData: {
        totalCount: 100,
        perPage: 5,
      },
      slots: {
        prev: "<div>prev-slot</div>",
        next: "<div>next-slot</div>",
        page: '<div data-test="page-slot" class="slot-page-class">{{params.value}}</div>',
      },
    });

    expect(
      wrapper
        .find('[data-name="pagination-itemContainer"] > [data-test-id="prev"]')
        .text()
    ).toEqual("prev-slot");
    expect(
      wrapper
        .find('[data-name="pagination-itemContainer"] > [data-test-id="next"]')
        .text()
    ).toEqual("next-slot");
    const paginationAnchor = wrapper.find('li > [data-test-id="page-5"]');

    expect(
      paginationAnchor.find('[data-name="pagination-page"]').exists()
    ).toBe(false);
    expect(paginationAnchor.find('[data-test="page-slot"]').exists()).toBe(
      true
    );
    expect(paginationAnchor.get("div").classes("slot-page-class")).toBe(true);
  });

  // **********************************************
  it("with item slot", () => {
    const wrapper = mount(TPagination, {
      propsData: {
        totalCount: 100,
        perPage: 5,
        pageRange: 3,
      },
      slots: {
        item: '<div class="test-slot-class" :class="{\'active-class\':params.activeValue==params.value}">{{params.value}}</div>',
      },
    });
    const paginationAnchor = wrapper.find(
      '[data-name="pagination-li"] > [data-test-id="page-6"]'
    );
    expect(
      paginationAnchor.find('[data-name="pagination-itemContainer"]').exists()
    ).toBe(false);
    expect(paginationAnchor.get("div").classes("test-slot-class")).toBe(true);
  });

  // ***********************************************

  const NuxtLink = {
    template: '<div @click="handleChange()"><slot>NuxtLink</slot></div>',
    props: ["to"],
    methods: {
      handleChange() {
        useRouter().push({ ...this.to });
      },
    },
  };
  it("withQuery is true ", async () => {
    const wrapper = mount(TPagination, {
      propsData: {
        totalCount: 100,
        perPage: 5,
        pageRange: 3,
        queryName: "pageFilter",
      },
      components: { NuxtLink },
    });

    const elementPage10 = wrapper.find(
      '[data-name="pagination-li"] > [data-test-id="page-10"]'
    );

    expect(elementPage10.text()).toEqual("10");

    await elementPage10.trigger("click");

    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith({
      query: {
        page: 5,
        pageFilter: 10,
        formPagination: { page: 3 },
      },
    });
  });
  // *****************************************************

  it("set formName", async () => {
    const wrapper = mount(TPagination, {
      propsData: {
        totalCount: 80,
        perPage: 6,
        formName: "formPagination",
      },
      components: { NuxtLink },
    });

    const elementPage5 = wrapper.find(
      '[data-name="pagination-li"] > [data-test-id="page-5"]'
    );

    expect(elementPage5.text()).toEqual("5");
    await elementPage5.trigger("click");
    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith({
      query: {
        page: 5,
        pageFilter: 8,
        formPagination: { page: 5 },
      },
    });
  });
});

<template>
  *****************************************************************************************************************************
  test DAccordion with has arrow
  <d-accordion
    :items="accordionTest"
    name="accordion-test"
    containerClass="bg-base-200 "
    wrapper-class="gap-y-3"
    :has-arrow="true"
    data-container-add="w-80"
    data-innerContainer-add="bg-red-100"
    data-radioButton-delete="peer"
    data-title-add="text-blue-500"
    data-content-add="text-purple-800"
  >
    <template #title="{ title }"
      ><div>collapse with focus-{{ title }}</div></template
    >
    <template #content="{ content }"
      ><div>content is : {{ content }}</div></template
    >
  </d-accordion>
  <d-accordion
    :items="accordionTest"
    name="accordion-test"
    containerClass="bg-base-200 "
    wrapper-class="gap-y-3"
    :has-arrow="true"
  >
    <template #title="{ title }"
      ><div>{{ title }}</div></template
    >
  </d-accordion>
  <div>
    test with forceOpen
    ####################################################################################
  </div>
  <d-accordion
    :items="accordionTest"
    name="accordion-test"
    containerClass="bg-base-200 "
    wrapper-class="gap-y-3"
    :force-open="true"
  >
  </d-accordion>
  <div>
    test with forceClose
    ####################################################################################
  </div>
  <d-accordion
    :items="accordionTest"
    name="accordion-test"
    containerClass="bg-base-200 "
    wrapper-class="gap-y-3"
    :force-close="true"
  >
  </d-accordion>

  <div>
    test with select second item and join items::{{ selectedItem }}
    ####################################################################################
  </div>
  <d-accordion
    :items="accordionTest"
    v-model="selectedItem"
    name="accordion-test"
    containerClass="bg-base-200 "
    :is-join="true"
  >
  </d-accordion>
  *****************************************************************************************************************************
  test DAccordion toggleWithHeader=false
  <d-accordion
    :items="accordionTest"
    name="accordion-test"
    containerClass="bg-base-200 "
    wrapper-class="gap-y-3"
    :has-arrow="true"
    content="description of collapse "
    :toggleWithHeader="false"
  >
  </d-accordion>
</template>

<script lang="ts">
export default {
  name: "TestDAccordion",
  setup() {
    const accordionTest = [
      { title: "title1", content: "content1" },
      { title: "title2", content: "content2" },
      { title: "title3", content: "content3" },
    ];

    const selectedItem = ref(1);
    return { accordionTest, selectedItem };
  },
};
</script>

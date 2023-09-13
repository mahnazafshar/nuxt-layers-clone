<template>
  <div class="p-3 flex flex-col gap-4">
    hi dear Mahnaz :))
    <hr />
    <hr />

    <d-collapsible
      class="bg-base-200 text-primary-content focus:bg-secondary focus:text-secondary-content"
      :is-focus="true"
      content="description of collapse "
      title-class="bg-secondary"
    >
      <template #title><div>collapse with focus</div></template>
    </d-collapsible>
    <d-collapsible
      class="bg-base-200"
      :can-toggle="true"
      data-checkbox-add="mt-8"
      data-container-add="p-8"
      title-class="bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
      content-class="bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
    >
      <template #title><div>لورم اپیسوم</div></template>
      <template
        #content
        class="bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
        ><div>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته،
        </div></template
      >
    </d-collapsible>
    <d-collapsible
      class="bg-base-200"
      :can-toggle="true"
      title-class="bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
      content-class="bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
    >
      <template #title><div>لورم اپیسوم</div></template>
      <template
        #content
        class="bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
        ><div>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته،
        </div></template
      >
    </d-collapsible>

    <d-collapsible class="bg-base-200 border" :has-animation="false">
      <template #title><div>collapse without animation</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>

    <d-collapsible
      class="bg-base-200"
      :has-arrow="true"
      data-title-add="text-red-500"
      data-content-add="text-blue-500"
    >
      <template #title><div>collapse with Arrow</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>

    <d-collapsible class="bg-base-200" :has-plus="true">
      <template #title><div>collapse with plus/minus icon</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>

    <d-collapsible class="bg-base-200" :force-open="true">
      <template #title><div>collapse open</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>

    <d-collapsible class="bg-base-200" :force-close="true">
      <template #title><div>collapse closed</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>

    <hr />
    <d-button
      class="btn btn-outline btn-primary w-[fit-content] mt-8"
      @click="toggleCollapseModel"
    >
      click to open collapse
    </d-button>

    <d-collapsible
      class="bg-base-200"
      :can-toggle="true"
      v-model="collapseModel"
    >
      <template #title><div>باز است</div></template>
      <template #content
        ><div>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته،
        </div></template
      >
    </d-collapsible>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    form: {
      type: Object,
    },
  },
  setup() {
    const collapseModel = ref(false);
    function toggleCollapseModel() {
      collapseModel.value = !collapseModel.value;
    }
    return { collapseModel, toggleCollapseModel };
  },
};
</script>

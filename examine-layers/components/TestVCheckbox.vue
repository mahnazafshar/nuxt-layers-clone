<template>
  <div>
    <h2>checkbox with same name:</h2>
    <VCheckbox
      checked-value="hi"
      v-model="hiModel"
      :useModelValue="true"
      name="withVModel"
      label="has checkedValue and modelValue ::::"
    ></VCheckbox>
    <hr />
    <div class="flex flex-row">
      <VCheckbox
        checked-value="obj1"
        v-model="arrayModel"
        :useModelValue="true"
        name="arrModel1"
        label="has checkedValue and modelValue ::::"
      ></VCheckbox>
      <VCheckbox
        checked-value="obj2"
        v-model="arrayModel"
        :useModelValue="true"
        name="arrModel2"
        label="has checkedValue and modelValue ::::"
      ></VCheckbox>
    </div>
    <hr />
    <VCheckbox
      checked-value="hi"
      name="job"
      label="has checkedValue for initial value"
    ></VCheckbox>
    <VCheckbox
      name="job"
      label="has not!! checkedValue for initial value "
      :color="VCheckboxColor.accent"
    ></VCheckbox>
    <hr />
    <VCheckbox
      name="test"
      v-model="form.test"
      :use-model-value="true"
      label="with V-Model?"
      :color="VCheckboxColor.secondary"
      :size="VCheckboxSize.lg"
    ></VCheckbox>

    <hr />
    <VCheckbox
      :checked-value="true"
      name="hasCar"
      label="checkbox for test disable"
      :color="VCheckboxColor.error"
      :size="VCheckboxSize.xs"
      :disabled="true"
    >
      <template #leftLabel
        ><span class="mx-5">**has left label**</span></template
      >
    </VCheckbox>

    <hr />
    <VCheckbox
      toggle
      checked-value="fronted"
      name="programmer"
      :size="VCheckboxSize.sm"
      :color="VCheckboxColor.error"
    >
      <template #label>
        <span
          >checkbox with checked value but not set initial value in form</span
        >
      </template>
    </VCheckbox>

    <hr />
    *******************************
    <VCheckbox
      name="hasUncheckedValue"
      v-model="form.step"
      :use-model-value="true"
      checked-value="step1"
      unchecked-value="step2"
      label="with V-Model and unCheckedValue?"
      :color="VCheckboxColor.secondary"
      :size="VCheckboxSize.lg"
    ></VCheckbox>
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
    const hiModel = ref("hi");
    const arrayModel = ref(["obj1"]);
    return { hiModel, arrayModel };
  },
};
</script>

<style scoped></style>

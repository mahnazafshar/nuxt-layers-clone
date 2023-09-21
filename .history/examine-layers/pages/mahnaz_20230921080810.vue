<template>
  <div class="p-5 flex flex-col">
  <!-- <test-demo></test-demo> -->
    <test-v-search-select></test-v-search-select>
    <!-- text input:
    <v-form @submit="onSubmit" :validation-schema="schema">
      verification code input :{{ code }}

      <v-verification-code-input
   
        name="code"
        :length="4"
        data-input-delete="h-12 w-12"
        data-input-add="h-14 w-14"
      ></v-verification-code-input>
      <d-button class="btn btn-primary" type="submit">submit </d-button>
    </v-form>
    <test-pagination></test-pagination>
    test Daisy-Forms
    <hr />
    <TestForm></TestForm>

    <hr />
    <TestDCollapse></TestDCollapse>

    <hr />
    <div class="p-3 flex flex-col gap-4">
      <TestDAccordion></TestDAccordion>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
const name = ref("");
const code = ref("");
// const birthday = ref("1368/3/2");
const birthday = ref("");
const schema = yup.object({
  // birthday: yup.string().required(),
  code: yup.string().required(),
});
function onSubmit(values: any) {
  console.log("click submit", values);
}
</script>

<template>
  <div class="p-5 flex flex-col">
    <!-- <t-progress-bar :value="69" ></t-progress-bar> -->
    <!-- <div>
      <t-circle-progress-bar v-model="percent" :stroke="15" :diameter="59" :size="134">
      <div>data</div>
      </t-circle-progress-bar>
    </div> -->

    <v-form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="{
        birthday: '1388/07/05',
        iban: '',
      }"
      class="flex flex-col gap-y-3"
    >
      mask:
      <v-mask-input name="iban"></v-mask-input>
      <!-- <v-birth-day label="تاریخ تولد" name="birthday"> </v-birth-day>

      <v-verification-code-input
        :length="4"
        name="code"
        data-input-delete="h-12 w-12"
        data-input-add="h-14 w-14"
        :auto-focus="true"
      ></v-verification-code-input> -->

      <d-button class="btn btn-primary" type="submit">submit </d-button>
    </v-form>
    <!-- <test-v-search-select></test-v-search-select>
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
const code = ref("");
const birthday = ref("1368/3/2");
// const birthday = ref("");
const schema = yup.object({
  // birthday: yup.string().required(),
  iban: yup.string().required(),
  // code: yup.string().required(),
});
function onSubmit(values: any) {
  console.log("click submit", values);
}

const percent = ref(35);
</script>

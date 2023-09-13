<template>
  <v-form
    class="VForm"
    @submit="onSubmit"
    :validation-schema="schema"
    :initialValues="{
      job: ['hi', 'bye'],
      firstName: 'Mahnaz',
      test: true,
      radioModel: true,
      hasCar: true,
      drinks: ['tea', 'coffee'],
    }"
    v-slot="{ values }"
  >
    <VTextInput label="first Name :" name="firstName"></VTextInput>
    <VTextInput v-model="form.email" name="email"></VTextInput>

    <hr />
    <TestVCheckbox :form="form"></TestVCheckbox>

    <div class="w-full h-1 bg-accent" />
    <TestVRadio :form="form"></TestVRadio>

    <d-button class="btn btn-primary" type="submit">submit </d-button>
  </v-form>
</template>

<script lang="ts" setup>
import * as yup from "yup";

const form = reactive({
  email: "emil field",
  test: true,
  radioModel: false,
  favorite: "coffee",
  step: "step1",
});

setTimeout(() => {
  form.radioModel = true;
  form.favorite = "tea";
  form.step = "step2";
}, 8000);
const schema = yup.object({
  email: yup.string().required().email(),
  job: yup.array().of(yup.string().required()).required(),
  test: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
  radioModel: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});
function onSubmit(values: any) {
  // Submit values to API...
  console.log("submit", values);
}
</script>

# VRadio

VRadio buttons allow the user to select one option from a set.

## props

| Props                                                                 | Type                    | Default             | Description                                                                                                                               |
| --------------------------------------------------------------------- | ----------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| name <sup :style="{color:'red', 'font-size': '10px' }">required</sup> | string                  | ''                  | radio name                                                                                                                                |
| label                                                                 | string                  | ''                  | label of VRadio                                                                                                                           |
| disabled                                                              | boolean                 | false               | for disable                                                                                                                               |
| successMessage                                                        | string                  | ''                  | for show success message under VRadio                                                                                                     |
| value                                                                 | string,boolean,number   | true                | value of radio                                                                                                                            |
| color                                                                 | string                  | VRadioColor.primary | item of interface VRadioColor                                                                                                             |
| size                                                                  | string                  | VRadioSize.md       | item of interface VRadioSize                                                                                                              |
| useModelValue                                                         | boolean                 | false               | if want use v-model                                                                                                                       |
| modelValue                                                            | string, number, boolean | false               | if you are using v-model do not set initialValue in the form and must tell VRadio you are using v-model by set useModelValue prop to true |

## slots

| name      | description               |
| --------- | ------------------------- |
| label     | show label of VRadio      |
| leftLabel | show left label of VRadio |

---

## disabled radio

```vue
<VRadio
  name="drinks"
  label="has value for initial value"
  :disabled="true"></VRadio>
```

## set color and size

for color prop: `VRadioColor.primary`, `VRadioColor.secondary`, `VRadioColor.accent`, `VRadioColor.success`, `VRadioColor.warning`, `VRadioColor.info` and `VRadioColor.error`.

for size prop: `VRadioSize.lg`, `VRadioSize.md`, `VRadioSize.sm` and `VRadioSize.xs`.

```vue
<VRadio
  value="tea"
  name="drinks"
  label="has value for initial value"
  :color="VRadioColor.accent"
  :size="VRadioSize.xs"></VRadio>
```

## with form-control

```vue
<template>
  <v-form
    class="VForm"
    @submit="onSubmit"
    :validation-schema="schema"
    :initialValues="{
      job: ['hi', 'bye'],
      test: true,
      radioModel: true,
      hasCar: true,
      drinks: ['tea', 'coffee'],
    }"
    v-slot="{ values }">
    <VRadio
      value="tea"
      name="drinks"
      label="has value for initial value"
      :color="VRadioColor.info"></VRadio>
    <VRadio
      name="drinks"
      label="has not!! value for initial value "
      :color="VRadioColor.accent"></VRadio>

    <VRadio
      name="radioModel"
      v-model="form.radioModel"
      :use-model-value="true"
      label="with V-Model?"
      :color="VRadioColor.secondary"
      :size="VRadioSize.lg"></VRadio>

    <VRadio
      name="favorite"
      v-model="form.favorite"
      value="coffee"
      :use-model-value="true"
      label="your favorite"
      :color="VRadioColor.secondary"
      :size="VRadioSize.lg"></VRadio>

    <d-button class="btn btn-primary" type="submit">submit </d-button>
  </v-form>
</template>

<script lang="ts" setup>
import * as yup from "yup";

const form = reactive({
  test: true,
  radioModel: true,
  favorite: "coffee",
  step: "step1",
});

const schema = yup.object({
  job: yup.array().of(yup.string().required()).required(),
  test: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
  radioModel: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});
function onSubmit(values: any) {
  console.log("submit", values);
}
</script>
```

## label slot

```vue
<VRadio value="backend" name="programmer" :color="VRadioColor.info">
  <template #label>
    <span>radio with value but not set initial value in form</span>
  </template>
</VRadio>
```

## leftLabel slot

```vue
<VRadio
  :value="true"
  name="hasCar"
  label="radio for test disable"
  :color="VRadioColor.error"
  :size="VRadioSize.xs">
      <template #leftLabel><span class="mx-5">left-label</span></template>
</VRadio>
```

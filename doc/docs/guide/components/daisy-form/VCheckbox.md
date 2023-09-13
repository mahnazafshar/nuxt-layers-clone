# VCheckbox

VCheckboxes are used to select or deselect a value.

## props

| Props                                                                 | Type                    | Default                | Description                                                                                                                                  |
| --------------------------------------------------------------------- | ----------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| name <sup :style="{color:'red', 'font-size': '10px' }">required</sup> | string                  | -                      | checkbox name                                                                                                                                |
| label                                                                 | string                  | ''                     | label of checkbox                                                                                                                            |
| modelValue                                                            | string, number, boolean | false                  | if you are using v-model do not set initialValue in the form and must tell VCheckbox you are using v-model by set useModelValue prop to true |
| useModelValue                                                         | boolean                 | false                  | if want use v-mode                                                                                                                           |
| disabled                                                              | boolean                 | false                  | for disable checkbox                                                                                                                         |
| successMessage                                                        | string                  | ''                     | for show success message under checkbox                                                                                                      |
| checkedValue                                                          | string,boolean,number   | true                   | value when checkbox is checked                                                                                                               |
| uncheckedValue                                                        | string,boolean,number   | false                  | value when checkbox is not checked                                                                                                           |
| color                                                                 | string                  | VCheckboxColor.primary | item of interface VCheckboxColor                                                                                                             |
| size                                                                  | string                  | VCheckboxSize.md       | item of interface VCheckSize                                                                                                                 |
| toggle                                                                | boolean                 | false                  | if set it true input will be render toggle classes                                                                                           |

## slots

| name      | description                 |
| --------- | --------------------------- |
| label     | show label of checkbox      |
| leftLabel | show left label of checkbox |

---

## disabled checkbox

```vue
<VCheckbox
  :checked-value="true"
  name="hasCar"
  label="checkbox for test disable"
  :disabled="true">
</VCheckbox>
```

## with same name

```vue
<h2>checkbox with same name:</h2>
<VCheckbox
  checked-value="hi"
  name="job"
  label="has checkedValue for initial value">
</VCheckbox>
<VCheckbox
  name="job"
  label="has not!! checkedValue for initial value "
  :color="VCheckboxColor.accent">
</VCheckbox>
```

## with form-control

```vue
<template>
  <v-form
    class="VForm"
    @submit="onSubmit"
    :validation-schema="schema"
    :initialValues="{
      test: true,
    }"
    v-slot="{ values }">
    <VCheckbox
      name="test"
      v-model="form.test"
      :use-model-value="true"
      label="with V-Model?"
      :color="VCheckboxColor.secondary"
      :size="VCheckboxSize.lg">
    </VCheckbox>

    <VCheckbox
      name="hasUncheckedValue"
      v-model="form.step"
      :use-model-value="true"
      checked-value="step1"
      unchecked-value="step2"
      label="with V-Model and unCheckedValue?"
      :color="VCheckboxColor.secondary"
      :size="VCheckboxSize.lg"></VCheckbox>
    <d-button class="btn btn-primary" type="submit">submit </d-button>
  </v-form>
</template>

<script lang="ts" setup>
import * as yup from "yup";
const form = reactive({
  test: true,
  step: "step1",
});

setTimeout(() => {
  form.step = "step2";
}, 8000);
const schema = yup.object({
  test: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});
function onSubmit(values: any) {
  console.log("submit", values);
}
</script>
```

## with modelValue

```vue
<template>
  <div class="flex flex-row">
    <VCheckbox
      checked-value="hi"
      v-model="hiModel"
      :useModelValue="true"
      name="withVModel"
      label="has checkedValue and modelValue ::::"></VCheckbox>
    <VCheckbox
      checked-value="obj1"
      v-model="arrayModel"
      :useModelValue="true"
      name="arrModel1"
      label="has checkedValue and modelValue ::::"></VCheckbox>
    <VCheckbox
      checked-value="obj2"
      v-model="arrayModel"
      :useModelValue="true"
      name="arrModel2"
      label="has checkedValue and modelValue ::::"></VCheckbox>
  </div>
</template>

<script lang="ts" setup>
const hiModel = ref("hi");
const arrayModel = ref(["obj1"]);
</script>
```

## label slot

```vue
<VCheckbox
  checked-value="fronted"
  name="programmer"
  :size="VCheckboxSize.sm"
  :color="VCheckboxColor.error">
    <template #label>
      <span>
        checkbox with checked value but not set initial value in form
      </span>
    </template>
</VCheckbox>
```

## leftLabel slot

```vue
<VCheckbox
  :checked-value="true"
  name="hasCar"
  label="checkbox for test disable"
  :color="VCheckboxColor.error"
  :size="VCheckboxSize.xs">
    <template #leftLabel>
    <span class="mx-5">**has left label**</span>
    </template>
</VCheckbox>
```

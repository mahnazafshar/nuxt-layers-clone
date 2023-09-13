# VSelect

VSelect is used to pick a value from a list of options.

## props

| name                                                                  | type            | Default | description                                                                                                          |
| --------------------------------------------------------------------- | --------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| name <sup :style="{color:'red', 'font-size': '10px' }">required</sup> | string          | -       | select name                                                                                                          |
| label                                                                 | string          | -       | determines whether to use half-star ratings or not                                                                   |
| successMessage                                                        | string          | -       | for show success message under select tag                                                                            |
| placeholder                                                           | string          | -       | set placeholder for select tag                                                                                       |
| disabled                                                              | boolean         | false   | for disable select                                                                                                   |
| color                                                                 | string          | -       | item of interface VSelectColor                                                                                       |
| size                                                                  | string          | -       | item of interface VSelectSize                                                                                        |
| items                                                                 | Array of Object | -       | items to show in dropdown for example : [{value: 1, text:'A', disabled: false},{value: 2, text:'B', disabled: true}] |
| labelField                                                            | string          | label   | label field                                                                                                          |
| valueField                                                            | string          | value   | value field                                                                                                          |
| modelValue                                                            | string, number  | -       | if you are using v-model do not set initialValue in the form and must tell VSelect you are using v-model             |

## slot

| name      | description               |
| --------- | ------------------------- |
| leftLabel | show left label of select |

---

## disabled select

```vue
<v-select
  name="status"
  :items="['happy', 'sad']"
  label="status"
  :disabled="true">
</v-select>
```

## set color and size

for color prop: `VSelectColor.primary`, `VSelectColor.secondary`, `VSelectColor.accent`, `VSelectColor.success`, `VSelectColor.warning`, `VSelectColor.info` and `VSelectColor.error`.

for size prop : `VSelectSize.lg`, `VSelectSize.md`, `VSelectSize.sm` and `VSelectSize.xs`.

```vue
<v-select
  name="status"
  :items="['happy', 'sad']"
  :color="VSelectColor.accent"
  :size="VSelectSize.sm">
</v-select>
```

## with v-model

```vue
<template>
  <v-select
    v-model="form.firstName"
    name="firstName"
    :items="nameItems"
    label-field="text"
    value-field="value"
    placeholder="select name">
  </v-select>
</template>

<script lang="ts" setup>
const form = reactive({
  firstName: 2,
});
const nameItems = [
  { value: 1, text: "John" },
  { value: 2, text: "Julia" },
  { value: 3, text: "Sarah" },
];
</script>
```

## with form-control

```vue
<template>
  <v-form
    class="VForm my-8"
    @submit="onSubmit"
    :validation-schema="schema"
    :initialValues="{
      firstName: 2,
    }"
    v-slot="{ values }">
    <v-select
      name="firstName"
      :items="nameItems"
      label-field="text"
      value-field="value"></v-select>
    <v-select
      v-model="form.grade"
      name="grade"
      :items="gradeItems"
      label-field="text"
      value-field="value"
      placeholder="select grade"></v-select>
    <v-select
      v-model="form.status"
      name="status"
      :items="statusItems"
      label-field="text"
      value-field="value"
      placeholder="select status"></v-select>
    <d-button class="btn btn-primary" type="submit">submit </d-button>
  </v-form>
</template>

<script setup lang="ts">
import * as yup from "yup";
provide("v-select-size", VSelectSize.xs);
const { model: dialogModel, open: openDialog } = useUiState();

const form = reactive({
  firstName: 2,
  grade: "",
  status: "",
});

const nameItems = [
  { value: 1, text: "John" },
  { value: 2, text: "Julia" },
  { value: 3, text: "Sarah" },
];
const gradeItems = [
  { value: 1, text: "A", disabled: false },
  { value: 2, text: "B", disabled: true },
  { value: 3, text: "C", disabled: false },
];
const statusItems = [
  { value: 1, text: "passed" },
  { value: 2, text: "failed" },
];

const schema = yup.object({
  firstName: yup.string().required(),
  grade: yup.string().required(),
  status: yup.string().required(),
});

function onSubmit(values: any) {
  console.log("submit", values);
}
</script>
```

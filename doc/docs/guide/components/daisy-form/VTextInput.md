# VTextInput

VTextInput is a simple input field.

## props

| name                                                                  | type           | Default | description                                                                                                 |
| --------------------------------------------------------------------- | -------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| name <sup :style="{color:'red', 'font-size': '10px' }">required</sup> | string         | -       | input name                                                                                                  |
| label                                                                 | string         | -       | determines whether to use half-star ratings or not                                                          |
| placeholder                                                           | string         | -       | set placeholder for select tag                                                                              |
| successMessage                                                        | string         | -       | for show success message under select tag                                                                   |
| area                                                                  | Boolean        | false   | make the input element textarea                                                                             |
| type                                                                  | string,        | text    | html input type                                                                                             |
| modelValue                                                            | string, number | -       | if you are using v-model do not set initialValue in the form and must tell VTextInput you are using v-model |

## slot

| name      | description               |
| --------- | ------------------------- |
| leftLabel | show left label of select |

---

## with v-model

```vue
<template>
  <VTextInput v-model="form.email" name="email"></VTextInput>
</template>

<script lang="ts" setup>
const form = reactive({
  email: "email field",
});
</script>
```

## with form-control

```vue
<template>
  <v-form
    class="VForm"
    @submit="onSubmit"
    :validation-schema="schema"
    :initialValues="{
      firstName: 'John',
    }"
    v-slot="{ values }">
    <VTextInput label="first Name :" name="firstName"></VTextInput>
    <VTextInput v-model="form.email" name="email"></VTextInput>
    <d-button class="btn btn-primary" type="submit">submit </d-button>
  </v-form>
</template>

<script lang="ts" setup>
import * as yup from "yup";

const form = reactive({
  email: "email field",
});

const schema = yup.object({
  email: yup.string().required().email(),
});

function onSubmit(values: any) {
  console.log("submit", values);
}
</script>
```

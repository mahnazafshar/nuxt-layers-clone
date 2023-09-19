#### props

| Props          | Type    | Default | Description                                  |
| -------------- | ------- | ------- | -------------------------------------------- |
| modelValue     | string  | -       | set input data to vModel                     |
| name           | string  | -       | name of VField                               |
| id             | string  | drag    | id of input                                  |
| accept         | string  | image   | type of file that input can get              |
| multiple       | boolean | false   | can change to true for upload multiple files |
| wrapperClass   | string  | -       | class for label of input                     |
| successMessage | string  | -       | for show success message under input         |

```vue
<template>
  <div>
    <v-form @submit="onSubmit" :validation-schema="schema">
      <v-file-input-draggable
        name="fileInput"
        accept="file/*"
      ></v-file-input-draggable>
      <d-button class="btn btn-primary" type="submit">submit </d-button>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
const schema = yup.object({
  fileInput: useFileValidation({ required: true, max: 12 }),
});
function onSubmit(values: any) {
  console.log("submit", values);
}
</script>
```

<template>
    <div>
      <v-form @submit="onSubmit" :validation-schema="schema">
        <v-file-input-draggable
          name="fileInput"
          accept="file/*"
          class="w-48 h-48"
        ></v-file-input-draggable>
        <d-button class="btn btn-primary" type="submit">submit </d-button>
      </v-form>
      <v-form @submit="onSubmit" :validation-schema="schema">
        <v-file-input-draggable
          name="imageInput"
          class="w-48 h-48"
        >
            <template #preview="getImageUrl">
                <img :src="getImageUrl.src" alt="file image" class="h-48 w-48 relative" />
            </template>
            <template #deleteFile>
                <button class="btn btn-error btn-sm">x</button>
            </template>
        </v-file-input-draggable>
        <d-button class="btn btn-primary" type="submit">submit </d-button>
      </v-form>
    </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
const schema = yup.object({
  fileInput: useFileValidation({ required: true }),
  imageInput: useFileValidation({ required: true }),
});
function onSubmit(values: any) {
  console.log("submit", values);
}
</script>
  
# DModal

DModal is used to show a dialog or a box when you click a button.

## props

| name            | type            | Default                      | description                                                                                                                                                                                                                     |
| --------------- | --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| modelValue      | boolean, number | false                        | state of modal (close or open)                                                                                                                                                                                                  |
| title           | string          | ''                           | Title of modal                                                                                                                                                                                                                  |
| eager           | boolean         | false                        | Forces the component’s content to render when it mounts. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.                                                                 |
| responsiveClass | string, array   | modal-bottom sm:modal-middle | It is for handel position of modal in different size of screens default value is that modal goes bottom on mobile screen and goes middle on desktop. we can use these three class : `modal-top`, `modal-bottom`, `modal-middle` |
| backdropClose   | boolean         | true                         | It set to true and when we click anywhere outside the modal, the modal will be closed                                                                                                                                           |
| closeButton     | boolean         | true                         | It set to true and when we click on `✕` button, the modal will be closed                                                                                                                                                        |

## with v-model

```vue
<template>
  <d-modal v-model="dialogModel" title="title of Modal">
    <p>content of modal</p>
  </d-modal>
  <button class="btn btn-primary" @click="openModal">open</button>
</template>

<script setup lang="ts">
const dialogModel = ref(false);
const openModal = () => {
  dialogModel.value = true;
};
</script>
```

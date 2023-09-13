# TToast

If you want to use TToast in your pages, first of all you should add it in the app.vue like this:

```vue
<template>
  <div>
    <nuxt-layout>
      <nuxt-page></nuxt-page>
    </nuxt-layout>
    <t-toast></t-toast>
  </div>
</template>
```

Then like the example bellow for showing toast we should use showToast. showToast get three arguments:<br>`message` : It is for the message we want to show in toast.<br>`type`: It is for get type of toast. there is four types: `success`, `error`, `info`, `warning`.

## Example

```vue
<template>
  <h2>Test TToast</h2>
  <d-button @click="showSuccessMessage">show success toast</d-button>
</template>

<script setup lang="ts">
const { showToast } = useToast();
const showSuccessMessage = () => {
  showToast({ message: "با موفقیت انجام شد.", type: ToastEnum.success });
};
</script>
```

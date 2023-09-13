# TTabs and TTabItem

## TTabs Props

| Props   | Type                    | Default | Description                  |
| ------- | ----------------------- | ------- | ---------------------------- |
| v-model | String, Number, Boolean | -       | v-model supported with input |
| arrows  | Boolean                 | true    | show arrows when scrolling   |

## TTabItem Props

| Props | Type            | Default | Description                                  |
| ----- | --------------- | ------- | -------------------------------------------- |
| eager | Boolean         | false   | set to true if you want seo                  |
| title | String          | -       | title for tab                                |
| value | primitive types | -       | use value instead of index for v-model value |

## TTabs Slots

| name       | description                                                                             |
| ---------- | --------------------------------------------------------------------------------------- |
| title      | slot for render tab header passed data is : selected and all props passed to t-tab-item |
| arrowLeft  | slot for custom arrow style                                                             |
| arrowRight | slot for custom arrow style                                                             |

## with v-model

```vue
<template>
  <t-tabs v-model="customTab">
    <template #title="{ title, selected, count }">
      <div
        class="mx-2 cursor-pointer min-w-max"
        :class="{ 'text-primary': selected }">
        <div
          class="w-6 h-6  rounded-full items-center justify-center  text-white bg-gray-500">
          {{ count }}
        </div>
        {{ title }}
      </div>
    </template>
    <t-tab-item :count="1" value="first-tab" eager title="tab1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </t-tab-item>
    <t-tab-item :count="2" title="tab2">
      It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout.
    </t-tab-item>
    <t-tab-item :count="3" title="tab3">
      Contrary to popular belief, Lorem Ipsum is not simply random text.
    </t-tab-item>
    <t-tab-item :count="1" title="tab4">
      There are many variations of passages of Lorem Ipsum available, but the
      majority have suffered alteration in some form, by injected humour, or
      randomised words which don't look even slightly believable.
    </t-tab-item>
  </t-tabs>
</template>

<script setup>
const customTab = ref("1");
</script>
```

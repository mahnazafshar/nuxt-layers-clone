# TSkeleton

## props

| name           | Type                  | Default     | Description                                                                                                     |
| -------------- | --------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| type           | string                | avatar-list | type of skeleton shape. we have these types: `AVATAR_LIST`, `IMAGE`, `CARD`, `ONE_LINE`, `THREE_LINE`, `CUSTOM` |
| border         | boolean               | true        | add border around of skeleton shape                                                                             |
| shadow         | boolean               | true        | add shadow around of skeleton shape                                                                             |
| rounded        | boolean               | false       | add border radius around of skeleton shape                                                                      |
| containerClass | object, string, array | ''          | used to apply custom styling to the skeleton container                                                          |

we strongly recommend use teleport

## slots

| name   | description                         |
| ------ | ----------------------------------- |
| footer | custom footer only for `card` shape |

## custom type of skeleton

```vue
<template>
  <t-skeleton
    v-for="i in 3"
    :key="`item-loading-${i}`"
    type="custom"
    class="-w-full h-full">
    <div class="w-full h-[30vh] bg-gray-400 rounded"></div>
  </t-skeleton>
</template>
```

## footer slot

```vue
<template>
  <t-skeleton type="card">
    <template #footer>
      <div class="mx-4 w-48 h-2 bg-gray-400 rounded "></div>
      <div class="mx-4 my-2 w-64 h-2 bg-gray-400 rounded "></div>
      <div class="mx-4 w-64 h-2 bg-gray-400 rounded "></div>
    </template>
  </t-skeleton>
</template>
```

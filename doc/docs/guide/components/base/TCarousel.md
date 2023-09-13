# TCarousel

## Props

| name               | Type                  | Default                     | Description                                                                                                                                                       |
| ------------------ | --------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| items              | array                 | []                          | items of the carousel to show                                                                                                                                     |
| slider             | boolean               | false                       | determines whether the carousel operates in slider mode or not                                                                                                    |
| arrows             | boolean               | true                        | controls whether navigation arrows (prev and next) are displayed for the carousel                                                                                 |
| defaultPadding     | boolean               | true                        | default padding applied to the carousel items                                                                                                                     |
| itemContainerClass | array, object, string | ''                          | allows you to provide additional CSS classes to the container of each carousel item                                                                               |
| config             | object                | duration: 1, ease: "power1" | GSAP config for animate in axis                                                                                                                                   |
| middle             | number                | -1                          | model value for middle. for example if we set it to bring item with index 2 to the middle, it brings that item into middle. index starts from 0                   |
| end                | number                | -1                          | end is for example to bring item with index 3 to the end. index starts from 0                                                                                     |
| start              | number                | -1                          | start is for example to bring item with index 1 to the start. index starts from 0                                                                                 |
| allowContextMenu   | boolean               | true                        | gsap [allowContextMenu](<https://greensock.com/docs/v2/Utilities/Draggable/Draggable()>).<br />for mobile set it to false because can get in the way of dragging. |
| autoPlayInterval   | number                | -1                          | interval between each image change in milliseconds in auto play                                                                                                   |

## Slots

| name       | description                 |
| ---------- | --------------------------- |
| next       | slot for next button        |
| prev       | slot for previous button    |
| item       | slot for each carousel item |
| pagination | slot for the pagination     |

## set middle props

```vue
<template>
  <t-carousel :items="items" :middle="middleActiveItem">
    <template #item="{ item, index }">
      <div class="card w-[30rem] bg-base-100 h-96 shadow-xl">
        <div class="card-body">
          {{ index }}
          <h2 class="card-title">Card title!</h2>
          <p>{{ item.text }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </template>
  </t-carousel>
  <button @click="changeMiddle" class="btn btn-secondary">change middle</button>
</template>

<script setup lang="ts">
const middleActiveItem = ref(0);
const changeMiddle = () => {
  middleActiveItem.value = 3;
};
const items = [
  { id: 1, text: "first Item" },
  { id: 2, text: "second Item" },
  { id: 3, text: "third Item" },
  { id: 4, text: "forth Item" },
  { id: 5, text: "fifth Item" },
  { id: 6, text: "sixth Item" },
];
</script>
```

## slider with pagination slot

```vue
<template>
  <t-carousel :items="items" slider>
    <template #item="{ item, index }">
      <div
        class="card w-[60rem] bg-neutral text-neutral-content h-96 shadow-xl">
        <div class="card-body">
          {{ index }}
          <h2 class="card-title">Card title!</h2>
          <p>{{ item.text }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary border-purple-700">Buy Now</button>
          </div>
        </div>
      </div>
    </template>
    <template #pagination></template>
  </t-carousel>
</template>

<script setup lang="ts">
const items = [
  { id: 1, text: "first Item" },
  { id: 2, text: "second Item" },
  { id: 3, text: "third Item" },
  { id: 4, text: "forth Item" },
  { id: 5, text: "fifth Item" },
  { id: 6, text: "sixth Item" },
];
</script>
```

## next and prev and item slots

```vue
<template>
  <t-carousel :items="items">
    <template #item="{ item, index }">
      <div
        class="card w-[30rem] bg-neutral text-neutral-content h-96 shadow-xl">
        <div class="card-body">
          {{ index }}
          <h2 class="card-title">Card title!</h2>
          <p>{{ item.text }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary border-purple-700">Buy Now</button>
          </div>
        </div>
      </div>
    </template>
    <template #prev>
      <span
        class="absolute right-10 z-40 text-gray-300 top-52 border rounded-full p-3"
        >prev</span
      >
    </template>
    <template #next>
      <span
        class="absolute left-10 z-40 text-gray-300 top-52 border rounded-full p-3"
        >next</span
      >
    </template>
  </t-carousel>
</template>

<script setup lang="ts">
const items = [
  { id: 1, text: "first Item" },
  { id: 2, text: "second Item" },
  { id: 3, text: "third Item" },
  { id: 4, text: "forth Item" },
  { id: 5, text: "fifth Item" },
  { id: 6, text: "sixth Item" },
];
</script>
```

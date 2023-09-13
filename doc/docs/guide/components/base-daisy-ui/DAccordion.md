# DAccordion

DAccordion is used for showing and hiding content but only one item can stay open at a time.

## props

| name             | type    | Default                            | description                                                          |
| ---------------- | ------- | ---------------------------------- | -------------------------------------------------------------------- |
| items            | array   | array of collapsible               |                                                                      |
| name             | string  | name of radio input and is require |
| hasArrow         | boolean | false                              | show arrow icon front of title                                       |
| hasPlus          | boolean | false                              | show plus/minus icon front of title                                  |
| forceOpen        | boolean | false                              | if true always collapse is opened                                    |
| forceClose       | boolean | false                              | if true always collapse is closed                                    |
| isJoin           | boolean | false                              | if to join the items together and handle border radius automatically |
| modelValue       | number  | index of selected item             |
| titleClass       | string  | ''                                 | class title                                                          |
| contentClass     | string  | ''                                 | class content                                                        |
| containerClass   | string  | ''                                 | class main selector of accordion                                     |
| wrapperClass     | string  | ''                                 | class wrapper of items loop                                          |
| toggleWithHeader | boolean | true                               |                                                                      |
| modelValue       | number  | -                                  |                                                                      |

## slots

| Name    | Description  |
| ------- | ------------ |
| title   | show title   |
| content | show content |

---

## with v-model

```vue
<template>
  <d-accordion
    :items="accordionTest"
    v-model="selectedItem"
    name="accordion-test"
    containerClass="bg-base-200 "
    :is-join="true">
  </d-accordion>
</template>

<script lang="ts" setup>
const accordionTest = [
  { title: "title1", content: "content1" },
  { title: "title2", content: "content2" },
  { title: "title3", content: "content3" },
];
const selectedItem = ref(1);
</script>
```

## with slot

```vue
<template>
  <d-accordion
    :items="accordionTest"
    name="accordion-test"
    containerClass="bg-base-200 "
    wrapper-class="gap-y-3"
    :has-arrow="true">
    <template #title="{ title }">
      <div>collapse with focus-{{ title }}</div>
    </template>
    <template #content="{ content }">
      <div>content is : {{ content }}</div>
    </template>
  </d-accordion>
</template>

<script lang="ts" setup>
const accordionTest = [
  { title: "title1", content: "content1" },
  { title: "title2", content: "content2" },
  { title: "title3", content: "content3" },
];
</script>
```

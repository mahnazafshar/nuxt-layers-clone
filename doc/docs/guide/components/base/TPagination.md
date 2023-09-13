# TPagination

## Props

| Props       | Type    | Default | Description                                                                    |
| ----------- | ------- | ------- | ------------------------------------------------------------------------------ |
| v-model     | number  | 1       | active page                                                                    |
| totalCount  | number  | 0       | total records count                                                            |
| perPage     | number  | 20      | number of items in each page                                                   |
| pageRange   | number  | 2       | number of of page around active page                                           |
| variant     | string  | primary | background color for active item                                               |
| colorClass  | string  | ""      | pass class to ignore variant                                                   |
| withQuery   | boolean | false   | put `nuxt-link` instead normal link (v-model not working in this case)         |
| queryName   | string  | "page"  | query name when using nuxt or vue link                                         |
| appendQuery | boolean | true    | append query when using nuxt or vue link                                       |
| formName    | string  | ""      | container key for query make sure using qs for stringify of parse your queries |

## Slots

| name | description                                |
| ---- | ------------------------------------------ |
| prev | slot for prev button                       |
| item | slot for item number pass page as -> value |
| page | slot for page number pass page as -> value |
| next | slot for next button                       |

## with v-model

```vue
<template>
  <t-pagination
    :totalCount="100"
    :perPage="10"
    v-model="count"
    :withQuery="false"
    data-container-delete="bg-white"
    colorClass="bg-secondary"
    :appendQuery="false"></t-pagination>
</template>

<script setup lang="ts">
const count = ref(1);
</script>
```

## with nuxt-link and pageRange, prev, next and page slots

```vue
<template>
  <t-pagination
    :total-count="100"
    :per-page="5"
    :page-range="3"
    data-container-delete="bg-white"
    variant="secondary"
    query-name="page-filter"
    :withQuery="true">
    <template #prev>
      <span>prev</span>
    </template>
    <template #next>
      <span>next</span>
    </template>
    <template #page="{ value, activeValue }"> {{ value }} </template>
  </t-pagination>
</template>
```

## with formName and item slot

```vue
<template>
  <t-pagination
    :total-count="100"
    :per-page="5"
    data-container-delete="bg-white"
    form-name="formPagination">
    <template #item="{ value, activeValue }">
      <div
        class="sm:h-10 sm:w-10 h-8 w-8 rounded-base flex items-center justify-center"
        :class="{ 'bg-[#503398] text-white': value == activeValue }">
        {{ value }}
      </div>
    </template>
  </t-pagination>
</template>
```

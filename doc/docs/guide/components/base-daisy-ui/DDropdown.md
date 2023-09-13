# DDropdown

DDropdown can open a menu or any other element when the button is clicked.

## props

| name                | type                                                                      | Default | description                                                                         |
| ------------------- | ------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| modelValue          | boolean                                                                   | false   | for handel behavior of dropdown. if modelValue is true `dropdown-open` class called |
| parentTag           | string                                                                    | ul      | wrapper tag                                                                         |
| parentClass         | string, Array<string \| Record<string, boolean>>, Record<string, boolean> | ''      | class of parentTag                                                                  |
| childTag            | string                                                                    | li      | wrapper tag for each item child if pass item slot it doesn't matter                 |
| items               | array                                                                     | []      | show items of dropdown                                                              |
| closeOnClickOutside | boolean                                                                   | false   | allows to control dropdown close state from outside                                 |
| hover               | boolean                                                                   | false   | open dropdown by hover                                                              |

## slots

| name    | description                                               |
| ------- | --------------------------------------------------------- |
| trigger | show title of dropdown                                    |
| items   | for render all items you should use v-for                 |
| item    | for render each item, component handle v-for loop for you |

## style

you can pass these classes to d-dropdown for set the position of dropdown: `dropdown-left`, `dropdown-right`, `dropdown-down`, `dropdown-top`

```vue
<template>
  <d-dropdown :items="items" class="dropdown-left">
    <template #trigger>Dropdown open & left</template>
    <template #item="{ item }">
      <div>{{ item.title }}</div>
    </template>
  </d-dropdown>
</template>

<script setup lang="ts">
const items = [
  { title: "title1", desc: "desc1" },
  { title: "title2", desc: "desc2" },
];
</script>
```

## with v-model and clickOutSide

```vue
<template>
  <div class="flex flex-col gap-4 items-center">
    <h1 class="font-bold">should click outside to close dropdown</h1>
    <div>
      <d-button class="btn btn-primary" @click="toggleDropdown"
        >test model</d-button
      >
      dropdownOutSideClickModel : {{ dropdownOutSideClickModel }}
    </div>
    <d-dropdown
      v-model="dropdownOutSideClickModel"
      :items="items"
      closeOnClickOutside>
      <template #trigger>Click On Me</template>
      <template #item="{ item }">
        <div>{{ item.title }}</div>
      </template>
    </d-dropdown>
  </div>
</template>

<script setup lang="ts">
const dropdownOutSideClickModel = ref(false);
function toggleDropdown() {
  dropdownOutSideClickModel.value = !dropdownOutSideClickModel.value;
}
</script>
```

## trigger and item slot

```vue
<template
<d-dropdown
  parentTag="div"
  childTag="div"
  :items="items"
>
  <template #trigger>with tag</template>
  <template #item="{item}">
    <div>{{ item.title }}</div>
    <div>{{ item.desc }}</div>
  </template>
</d-dropdown>
</template>

<script setup lang="ts">
const items =  [
  { title: "title1", desc: "desc1" },
  { title: "title2", desc: "desc2" },
]
</script>
```

#### props

| name                | type    | Default | description                                                         |
| ------------------- | ------- | ------- | ------------------------------------------------------------------- |
| parentTag           | string  | ul      | wrapper tag                                                         |
| childTag            | string  | li      | wrapper tag for each item child if pass item slot it doesn't matter |
| items               | array   | -       | show items of dropdown                                              |
| closeOnClickOutside | boolean | true    | allows to control dropdown close state from outside                 |
| hover               | boolean | true    | open dropdown by hover                                              |

#### slots

| name    | description                                               |
| ------- | --------------------------------------------------------- |
| trigger | show title of dropdown                                    |
| items   | for render all items you should use v-for                 |
| item    | for render each item, component handle v-for loop for you |

##### modelValue

type:boolean

```vue
//pass v-model to control the component from page we use it
<d-dropdown v-model="dropdownModel" :items="items">
<template #trigger>Click On Me</template>
<template #item="{item}">
<div>{{ item.title }}</div>
</template>
</d-dropdown>

//pass closeOnClickOutside true prop to control dropdown to close when click
anywhere outside of dropdown
<d-dropdown
  v-model="dropdownOutSideClickModel"
  :items="items"
  :closeOnClickOutside="true"
>
  <template #trigger>Click On Me</template>
  <template #item="{item}">
    <div>{{ item.title }}</div>
  </template>
</d-dropdown>

//get parentTag and childTag for customize dropdown Items (ex: for show card)
<d-dropdown tag="div" childTag="div" :items="items">
  <template #trigger>with tag</template>
  <template #item="{item}">
    <div>{{ item.title }}</div>
  </template>
</d-dropdown>

//set hover prop
<d-dropdown :items="items" :hover="true">
  <template #trigger>Hover Me</template>
  <template #item="{item}">
    <div>{{ item.title }}</div>
  </template>
</d-dropdown>

//pass class dropdown-left|right|down|top for position of dropdown and
dropdown-end to align dropdown to end
<d-dropdown :items="items" class="dropdown-left">
  <template #trigger>Dropdown open & left</template>
  <template #item="{item}">
    <div>{{ item.title }}</div>
  </template>
</d-dropdown>
```

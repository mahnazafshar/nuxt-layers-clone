# TTable

## Props

| Props          | Type                       | Default                                                      | Description                                                                                                                                                                    |
| -------------- | -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| items          | Array of Object            | []                                                           | any key value you want to render in table there is some special keys in here : `_cellVariants?: { [key: string]: variants }`, `_rowVariant?: string`, `_showDetails?: boolean` |
| fields         | Array of Object            | -                                                            | key is the key inside `items` object for example `{ key: 'last_name', label: 'Lastname', sortable: true, variant: 'danger' }`                                                  |
| localSort      | Boolean                    | true                                                         | is local sort enable                                                                                                                                                           |
| rounded        | Boolean                    | true                                                         | is table rounded                                                                                                                                                               |
| card           | Boolean                    | true                                                         | if set true in sm breakpoint will hide the table and show cards instead                                                                                                        |
| renderTable    | Boolean                    | true                                                         | if you want avoid table rendering base on userAgent or what ever...                                                                                                            |
| renderCard     | Boolean                    | true                                                         | if you want avoid card rendering base on userAgent or what ever...                                                                                                             |
| loading        | Boolean                    | false                                                        | show loading                                                                                                                                                                   |
| loadingText    | String                     | Loading                                                      | show text under loading                                                                                                                                                        |
| loadingProps   | Object                     | `{colorClass: "border-gray-300",size: "md",type: "spinner"}` | props for loading component                                                                                                                                                    |
| divideX        | Boolean                    | true                                                         | should has border for columns                                                                                                                                                  |
| divideY        | Boolean                    | true                                                         | should has border for rows                                                                                                                                                     |
| hasCounter     | Boolean                    | true                                                         | row counter in first column                                                                                                                                                    |
| hasCardCounter | Boolean                    | true                                                         | row counter in head of card                                                                                                                                                    |
| hover          | Boolean                    | true                                                         | highlight a row when is hovering                                                                                                                                               |
| hoverClass     | String                     | hover:bg-gray-100                                            | hovering class                                                                                                                                                                 |
| striped        | Boolean                    | false                                                        | zebra table                                                                                                                                                                    |
| stripedClass   | String                     | bg-gray-50                                                   | striped class                                                                                                                                                                  |
| resetExpand    | Array,Object,Number,String | 0                                                            | t-table watch this prop and if it changed will reset all expanded rows                                                                                                         |

## Slots

| name                   | description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| header            | bind: item, activeSort : `{ key: string; sort: asc or desc }`    |
| counter           | bind: `value`                                                    |
| cell(yourItemKey) | for specific cell bind: `A`                                      |
| cell              | for all cells bind: `A`                                          |
| loading           | render custom loading                                            |
| rowDetails             | expandable details bind: `A` + `isCard`: is inside card or table |
| loading                | render custom loading for table                                  |

1.  A ->

    - column : column number
    - row : row number
    - item : current item
    - itemKey : current item key
    - value : current item value
    - toggleDetails : a method for toggle details for collapsible table

reset expands
@closeExpand
will emit reset method when table mounted you can save it in a variable as a method and call it when ever you need

## with slot

```vue
<template>
  <div>
    <t-table :items="tableItems" :fields="TableFields">
      <template #cell(toggle)="{ toggleDetails }">
        <button @click="toggleDetails" class="btn btn-primary">btn</button>
      </template>
      <template #header="{ item, activeSort }">
        <div>
          <h2>{{ item.label }}</h2>
        </div>
      </template>
      <template #cell="{ value }">
        <span>{{ value }}</span>
      </template>
      <template #rowDetails="{ item, isCard }">
        <div>
          <p>{{ item.description }}</p>
          <p>Is inside card: {{ isCard }}</p>
        </div>
      </template>
      <template #counter="{ value }">
        <span>/counter{{ value }}/</span>
      </template>
    </t-table>
  </div>
</template>

<script setup lang="ts">
const tableItems = [
  { id: 1, title: "firstItem", description: "Desc 1" },
  { id: 2, title: "secondItem", description: "Desc 2" },
  { id: 3, title: "thirdItem", description: "Desc 3" },
];
const TableFields = [
  { key: "toggle", label: "" },
  { key: "title", label: "عنوان", sortable: true },
  { key: "id", label: "شناسه" },
];
</script>
```

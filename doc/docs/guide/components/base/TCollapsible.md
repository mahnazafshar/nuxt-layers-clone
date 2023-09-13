# TCollapsible

## Props

| Props     | Type            | Default     | Description         |
| --------- | --------------- | ----------- | ------------------- |
| show      | number, Boolean | -           | visible state       |
| duration  | number          | 300         | milliSecond         |
| easeClass | string          | ease-in-out | tailwind ease class |
| tag       | string          | div         | wrapper tag         |

## slots

| name    | description     |
| ------- | --------------- |
| default | render children |

## Example

```vue
<template>
  <button class="btn btn-primary" @click="toggleCollapse">open collapse</button>
  <t-collapsable :show="showCollapse">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
      praesentium odit libero, est minus eveniet nam voluptates possimus a iste
      dolores vero maxime ab ducimus mollitia atque omnis? Quia, commodi.
    </p>
  </t-collapsable>
</template>

<script setup>
const { model: showCollapse, toggle: toggleCollapse } = useUiState();
</script>
```

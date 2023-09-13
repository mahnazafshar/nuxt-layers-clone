# TRangeSlider

## Props

| name             | Type    | Default | Description              |
| ---------------- | ------- | ------- | ------------------------ |
| v-model:minValue | Number  | 0       | v-model for min value    |
| v-model:maxValue | Number  | 0       | v-model for max value    |
| min              | Number  | 0       | min value (range)        |
| max              | Number  | 0       | max value (range)        |
| disableMin       | Boolean | false   | don't show min circle    |
| disableMax       | Boolean | false   | don't show min circle    |
| variant          | string  | primary | background color variant |

## Slots

| name      | description                                  |
| --------- | -------------------------------------------- |
| min-inner | if you want set any things inside min circle |
| max-inner | if you want set any things inside max circle |

## with v-model

```vue
<template>
  <t-range-slider
    :min="0"
    :max="100"
    :max-value="maxValue"
    :min-value="minValue"
    @update:maxValue="changeMaxValue"
    @update:minValue="changeMinValue">
  </t-range-slider>
</template>

<script setup lang="ts">
const minValue = ref(20);
const maxValue = ref(97);

function changeMinValue(value) {
  minValue.value = value;
}

function changeMaxValue(value) {
  maxValue.value = value;
}
</script>
```

## with slot

```vue
<template>
  <t-range-slider
    :min="0"
    :max="100"
    :max-value="maxValue"
    :min-value="minValue"
    @update:maxValue="changeMaxValue"
    @update:minValue="changeMinValue">
    <template #min-inner="{ minValue }">
      <p class="absolute bottom-10 border rounded-md">min: {{ minValue }}</p>
    </template>
    <template #max-inner="{ maxValue }">
      <p class="absolute bottom-10 border rounded-md">max: {{ maxValue }}</p>
    </template>
  </t-range-slider>
</template>

<script setup lang="ts">
const minValue = ref(10);
const maxValue = ref(95);

function changeMinValue(value) {
  minValue.value = value;
}

function changeMaxValue(value) {
  maxValue.value = value;
}
</script>
```

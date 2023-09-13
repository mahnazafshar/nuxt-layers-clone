# TRangeInput

## Props

| name       | Type    | Default | Description                                                                         |
| ---------- | ------- | ------- | ----------------------------------------------------------------------------------- |
| modelValue | number  | -       | value of the range input                                                            |
| min        | number  | 0       | minimum value allowed for the range input                                           |
| max        | number  | 100     | maximum value allowed for the range input                                           |
| step       | number  | 1       | sets the step size for the range input                                              |
| ltr        | boolean | -       | indicates whether the component should be displayed from left to right (LTR) or not |
| color      | string  | #377DFF | defines the color of the range input's slider thumb                                 |

## with v-model

```vue
<template>
  <t-range-input
    v-model="SumSurveyScore"
    :min="0"
    :max="20"
    :step="1"
    class="w-full text-2xs" />
</template>

<script setup lang="ts">
const SumSurveyScore = ref(8);
</script>
```

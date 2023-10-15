<template>
  <div class="tooltip" :class="{ 'tooltip-open': debounced }" :data-tip="text">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useVModel, refDebounced } from "@vueuse/core";
const props = withDefaults(
  defineProps<{
    modelValue: string;
    text: string;
    duration: number;
  }>(),
  { duration: 2000 }
);
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);
const debounced = refDebounced(model, props.duration);
</script>

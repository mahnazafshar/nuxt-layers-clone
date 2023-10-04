<template>
  <div :class="renderClass">
    <p>{{ currentPageSize }}</p>
    <!-- <VCheckbox
      :model-value="ltrModel"
      name="ltr toggle"
      :use-model-value="true"
      :label="dir"
      toggle
      @update:model-value="toggle"
    /> -->
  </div>
</template>

<script setup lang="ts">
import {
  breakpointsTailwind,
  useBreakpoints,
  // useDebounceFn,
} from "@vueuse/core";
interface Props {
  renderClass?: string;
}
defineProps<Props>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const currentPageSize = computed(
  () => unref(breakpoints.current())[unref(breakpoints.current()).length - 1]
);

// const { ltrModel, dir } = useDirection();
// const debouncedFn = useDebounceFn(
//   (newValue: boolean) => {
//     ltrModel.value = newValue;
//   },
//   1000,
//   { maxWait: 5000 }
// );

// const toggle = (newValue: boolean) => {
//   debouncedFn(newValue);
// };
</script>

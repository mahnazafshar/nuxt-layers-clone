<template>
  <div
    class="flex items-center justify-center relative"
    :class="`w-[${getWidth}rem] h-[${getHeight}rem]`"
  >
    <svg
      class="transform -rotate-90"
      :class="`w-[${getWidth}rem] h-[${getHeight}rem]`"
    >
      <circle
        :cx="coordinate"
        :cy="coordinate"
        :r="diameter"
        stroke="currentColor"
        :stroke-width="stroke"
        fill="transparent"
        class="text-gray-700"
      />
      <circle
        :cx="coordinate"
        :cy="coordinate"
        :r="diameter"
        stroke="currentColor"
        :stroke-width="stroke"
        fill="transparent"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="circumference - (modelValue / 100) * circumference"
        class="text-blue-500"
      />
    </svg>
    <!-- <div class="absolute text-5xl"
      ><slot></slot
    ></div> -->
    <div
      class="absolute right-1/2 top-1/2 transform -translate-y-1/2 translate-x-1/2"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  modelValue: number;
  stroke?: number;
  size: number;
}

const props = withDefaults(defineProps<Props>(), {
  // diameter: 120,
  stroke: 30,
});
const diameter = computed(() => props.size / 2 - 8);
const circumference = computed(() => {
  return ((2 * 22) / 7) * unref(diameter);
});

const coordinate = computed(() => props.size / 2);
const getWidth = computed(() => props.size / 16);
const getHeight = computed(() => props.size / 16);
</script>

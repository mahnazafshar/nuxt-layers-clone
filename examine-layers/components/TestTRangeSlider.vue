<template>
  <div class=" max-w-[20rem] mx-auto">
    <div class="mt-20">
    <t-range-slider
      :min="0"
      :max="1000000"
      :max-value="maxValue"
      :min-value="minValue"
      @update:maxValue="changeMaxValue"
      @update:minValue="changeMinValue"
      >
      
      <template #min-inner="{minValue}">
        <p class="absolute bottom-10 border rounded-md">min: {{ minValue }}</p>
    </template>
      <template #max-inner="{maxValue}">
        <p class="absolute bottom-10 border rounded-md">max: {{ maxValue }}</p>
    </template>
</t-range-slider>
</div>
<div class="mt-20">
    <t-range-slider
    :min="0"
    :max="100"
    :max-value="maxVal"
    @update:maxValue="changeMaxVal"
    disableMin
    variant="success"
    >
      <template #max-inner="{maxValue}">
        <p class="absolute bottom-10 border rounded-md">value: {{ maxValue }}</p>
      </template>
    </t-range-slider>
</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const minValue = ref(200000);
const maxValue = ref(500000);

function changeMinValue(value) {
  minValue.value = value;
}

function changeMaxValue(value) {
  maxValue.value = value;
}

const maxVal= ref(15);


function changeMaxVal(value) {
  maxVal.value = value;
}
</script>
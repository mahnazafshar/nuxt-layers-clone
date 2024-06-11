<template>
  <div
    data-name="container"
    :class="renderClass('t-rating flex flex-row items-center', 'container')"
    v-bind="attrsToBind"
  >
    <label v-for="index in totalStars" :key="index">
      <span v-show="index <= selectedRating">
        <slot name="activeIcon"></slot>
      </span>
      <span v-show="index > selectedRating">
        <slot name="inactiveIcon"></slot>
      </span>
      <input
        v-model="selectedRating"
        type="radio"
        :name="name"
        :value="index"
        data-name="icon"
        class="hidden"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
interface Props {
  modelValue?: number;
  name?: string;
  totalStars?: number;
  useHalfStars?: boolean;
  iconClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  totalStars: () => inject("d-rating-total-star", 5),
});
const selectedRating = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

watch(selectedRating, () => {
  if (props.modelValue != unref(selectedRating)) {
    emit("update:modelValue", selectedRating.value);
  }
});

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue != unref(selectedRating)) {
      selectedRating.value = props.modelValue;
    }
  }
);
const resetInputClick = (newValue: number) => {
  emit("update:modelValue", newValue);
};
const { renderClass, attrsToBind } = useRenderClass("TRating");
</script>

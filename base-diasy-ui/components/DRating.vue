<template>
  <div
    data-name="container"
    :class="renderClass('rating transform -scale-x-100', 'container')"
    v-bind="attrsToBind"
  >
    <template v-if="!useHalfStars">
      <input
        v-model="selectedRating"
        type="radio"
        :name="name"
        data-name="reset"
        class="rating-hidden"
        :value="0"
        @click="resetInputClick(0)"
      >
      <input
        v-for="index in totalStars"
        :key="index"
        v-model="selectedRating"
        type="radio"
        :name="name"
        :value="index"
        data-name="icon"
        :class="renderClass(`mask ${iconClass}`, 'icon')"
      >
    </template>
    <template v-else>
      <input
        v-model="selectedRating"
        type="radio"
        :name="name"
        data-name="resetHalfIcon"
        class="rating-hidden"
        :value="0"
        @click="resetInputClick(0)"
      >
      <template
        v-for="index in totalStars"
        :key="index"
      >
        <input
          v-model="selectedRating"
          type="radio"
          :name="name"
          :value="index - 0.5"
          data-name="halfIcon"
          :class="renderClass(`bg-green-500 mask mask-half-2 ${iconClass}`, 'halfIcon')"
        >
        <input
          v-model="selectedRating"
          type="radio"
          :name="name"
          :value="index"
          data-name="halfIcon"
          :class="renderClass(`bg-green-500 mask mask-half-1 ${iconClass}`, 'halfIcon')"
        >
      </template>
    </template>
  </div>
</template>


<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
interface Props {
  modelValue?: number;
  name?: string;
  totalStars?: number;
  useHalfStars?: boolean;
  iconClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  totalStars: ()=> inject('d-rating-total-star', 5),
  useHalfStars: () => inject('d-rating-use-half-stars', false),
  iconClass: ()=> inject('d-rating-icon-class', 'mask-star'),
});
const selectedRating = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

watch(selectedRating,()=>{
  if(props.modelValue!= unref(selectedRating)){
  emit("update:modelValue", selectedRating.value);
  }
})

watch(
  ()=>props.modelValue,
  ()=>{
    if(props.modelValue!= unref(selectedRating)){
      selectedRating.value=props.modelValue;
    }
  }
)
const resetInputClick = (newValue: number) => {
  emit('update:modelValue', newValue);
};
const { renderClass, attrsToBind } = useRenderClass("DRating");
</script>

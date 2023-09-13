<template>
  <div
    ref="dropdownContainerElement"
    :value="modelValue"
    data-name="container"
    :class="renderClass('dropdown', 'container', { 'dropdown-open': modelValue, 'dropdown-hover': hover })"
    v-bind="attrsToBind"
  >
    <label
      tabindex="0"
      data-name="label"
      :class="renderClass('btn m-1', 'label')"
    >
      <slot name="trigger" />
    </label>
    <component
      :is="parentTag"
      tabindex="0"
      data-name="parentTag"
      :class="renderClass(`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ${parentClass}`, 'parentTag')"
    >
      <slot name="items">
        <component
          :is="getChildTag"
          v-for="(item, index) in items"
          :key="`drop-down-${index}`"
          data-name="childTag"
          :class="renderClass('', 'childTag')"
        >
          <slot
            name="item"
            :item="item"
          >
            {{ item }}
          </slot>
        </component>
      </slot>
    </component>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

defineOptions({
  inheritAttrs: false,
})

const { renderClass, attrsToBind } = useRenderClass("DDropdown");

const emit = defineEmits(["update:modelValue"]);

interface Props {
  parentTag?: string;
  parentClass?:
    | string
    | Array<string | Record<string, boolean>>
    | Record<string, boolean>;
  childTag?: string;
  items?: Array<any>;
  modelValue?: boolean;
  closeOnClickOutside?:boolean;
  hover?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  parentTag: () => inject('d-dropdown-parent-tag', 'ul'),
  childTag: () => inject('d-dropdown-child-tag', 'li'),
  items: () => [],
  modelValue: false,
  parentClass: ()=> inject('d-dropdown-parent-class', ''),
  closeOnClickOutside:()=> inject('d-dropdown-close-on-click-outside', false),
  hover: ()=> inject('d-dropdown-hover', false),
});

const getChildTag = computed(() => {
  return props.childTag ? props.childTag : "li";
});
watch(
  () => props.modelValue,
  (value) => {
    emit("update:modelValue", value);
  }
);

const dropdownContainerElement= ref<HTMLElement>()
onClickOutside(dropdownContainerElement, ()=>{
  if (props.modelValue && props.closeOnClickOutside) {
    emit('update:modelValue', false)
  }
})
</script>

<style scoped></style>

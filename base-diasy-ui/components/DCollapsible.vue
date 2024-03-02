<template>
  <component
    :is="hasAnimation ? 'div' : 'details'"
    :value="modelValue"
    :tabindex="isFocus || hasArrow || hasPlus || forceOpen ? '0' : ''"
    data-name="container"
    :class="
      renderClass('collapse', 'container', {
        'collapse-arrow': hasArrow,
        'collapse-plus': hasPlus,
        'collapse-open': forceOpen || modelValue,
        'collapse-close': forceClose,
      })
    "
    v-bind="attrsToBind"
  >
    <input
      v-if="canToggle"
      value=""
      type="checkbox"
      :checked="modelValue"
      data-name="checkbox"
      :class="renderClass('peer', 'checkbox')"
    />
    <component
      :is="hasAnimation ? 'div' : 'summary'"
      data-name="title"
      :class="renderClass(`collapse-title ${titleClass}`, 'title')"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </component>
    <div
      data-name="content"
      :class="renderClass(`collapse-content ${contentClass}`, 'content')"
    >
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const { renderClass, attrsToBind } = useRenderClass("DCollapsible");

const emit = defineEmits(["update:modelValue"]);

interface Props {
  title?: string;
  content?: string;
  isFocus?: boolean;
  canToggle?: boolean;
  hasAnimation?: boolean;
  hasArrow?: boolean;
  hasPlus?: boolean;
  forceOpen?: boolean;
  forceClose?: boolean;
  modelValue?: boolean;
  titleClass?: string;
  contentClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  isFocus: false,
  canToggle: true,
  hasAnimation: true,
  hasArrow: false,
  hasPlus: false,
  forceOpen: false,
  forceClose: false,
  modelValue: false,
});

watch(
  () => props.modelValue,
  (value) => {
    emit("update:modelValue", value);
  }
);
</script>

<template>
  <button
    data-name="container"
    :class="
      renderClass('relative', 'container', { 'pointer-events-none': loading })
    "
    v-bind="attrsToBind"
  >
    <span
      data-name="loadingContainer"
      :class="renderClass('', 'loadingContainer', { invisible: loading })"
    >
      <slot />
    </span>
    <span
      v-if="loading"
      data-name="loading"
      :class="
        renderClass(
          'loading loading-dots loading-md absolute transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2',
          'loading'
        )
      "
    />
  </button>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const { renderClass, attrsToBind } = useRenderClass("DButton");

interface Props {
  loading?: boolean;
}
withDefaults(defineProps<Props>(), {
  loading: false,
});
</script>

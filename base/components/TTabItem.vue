<template>
  <div
    data-name="container"
    :class="renderClass('', 'container', { 'h-0 overflow-hidden': !isActive })"
    v-bind="attrsToBind"
  >
    <div
      data-name="content"
      :class="
        renderClass(
          'transform transition-all ease-in duration-300',
          'content',
          {
            'opacity-0': !isActive,
          }
        )
      "
    >
      <template v-if="(activeOnce && shallowEager) || isActive || eager">
        <slot :isActive="isActive" :index="index"></slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, inject, watchEffect } from "vue";
import type { TabProvider } from "./TTabs.vue";
export default defineComponent({
  name: "TTabItem",
  inheritAttrs: false,
  props: {
    eager: {
      type: Boolean,
      default: false,
    },
    shallowEager: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup() {
    const { renderClass, attrsToBind } = useRenderClass("TTabItem");

    const index = ref(-1);
    const isActive = ref(false);
    const activeOnce = ref(false);
    const tabs = inject("TabsProvider") as TabProvider;

    watch(
      () => tabs.selectedIndex,
      (value) => {
        if (unref(index) == -1) {
          index.value = tabs.count;
          tabs.count++;
        }
        isActive.value = index.value === value;
      },
      { immediate: true }
    );

    // onBeforeMount(() => {
    //   index.value = tabs.count;
    //   tabs.count++;
    //   isActive.value = index.value === tabs.selectedIndex;
    // });
    watchEffect(() => {
      if (isActive.value) {
        activeOnce.value = true;
      }
    });
    return { index, isActive, activeOnce, renderClass, attrsToBind };
  },
});
</script>

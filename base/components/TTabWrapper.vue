<template>
  <div>
    <slot :tabErrorChecker="tabErrorChecker"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, provide, watch } from 'vue';

export default defineComponent({
  props: {
    errors: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    tab: {
      type: String,
      required: false,
      default: () => '',
    },
  },
  setup(props) {
    const tabErrorChecker = () => {
      const list = document.querySelectorAll('[data-name="tabs-header"]');
      if (typeof list == 'object' && list != null) {
        //@ts-ignore
        for (const headerElement of list) {
          const value = headerElement.getAttribute('data-value');
          if (!value) {
            continue;
          }
          const content = document.querySelector(`[value="${value}"]`);
          if (content?.querySelector('.q-field--error')) {
            headerElement.classList.add('text-negative');
          } else {
            headerElement.classList.remove('text-negative');
          }
        }
      }
    };
    watch(
      () => [props.errors, props.tab],
      async () => {
        await nextTick();
        tabErrorChecker();
      },
      { deep: true }
    );
    provide('tabErrorChecker', tabErrorChecker);
    return { tabErrorChecker };
  },
});
</script>

<template>
  <div
    data-name="container"
    :class="renderClass('', 'container')"
    v-bind="attrsToBind"
  >
    <v-text-input
      v-model="input"
      name="search"
      data-name="input"
      :class="renderClass('', 'input')"
    ></v-text-input>
    <div data-name="wrapper" :class="renderClass('flex flex-col', 'wrapper')">
      <template v-if="results.length > 0">
        <div v-for="(result, index) in results" :key="`result-${index}`">
          <slot name="item" :item="result.item" :index="result.refIndex">
            <span>
              {{ result.item.name }}
            </span>
          </slot>
        </div>
      </template>
      <template v-else>
        <slot name="empty">
          <div class="text-center pt-8 pb-4 opacity-80">نتیجه ای یافت نشد!</div>
        </slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { useFuse } from "@vueuse/integrations/useFuse";
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      required: true,
    },
    searchKeys: {
      type: Array as PropType<string[]>,
      default: () => ["name"],
    },
  },
  setup(props) {
    const input = ref<string>("");
    const exactMatch = ref(true);
    const matchAllWhenSearchEmpty = ref(true);

    const options = computed(() => ({
      fuseOptions: {
        keys: props.searchKeys,
        threshold: exactMatch.value ? 0 : undefined,
      },
      matchAllWhenSearchEmpty: matchAllWhenSearchEmpty.value,
    }));
    // *****************************
    const { results } = useFuse(input, props.data, options);
    const { renderClass, attrsToBind } = useRenderClass("VSearchSelect");
    return { results, input, renderClass, attrsToBind };
  },
};
</script>

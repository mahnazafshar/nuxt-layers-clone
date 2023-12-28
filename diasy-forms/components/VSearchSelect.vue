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
      :placeholder="placeholderSearch"
    ></v-text-input>
    <div data-name="wrapper" :class="renderClass('flex flex-col', 'wrapper')">
      <template v-if="results.length > 0">
        <div v-for="(result, index) in results" :key="`result-${index}`">
          <div
            @click="selectItem(result.item)"
            :class="selectable ? 'cursor-pointer' : 'cursor-not-allowed'"
          >
            <slot
              name="item"
              :item="result.item"
              :index="result.refIndex"
              :selected="selected"
            >
              <span>
                {{ result.item.name }}
              </span>
            </slot>
          </div>
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
    modelValue: {
      type: [String, Number, Object],
    },
    data: {
      type: Array,
      required: true,
    },
    searchKeys: {
      type: Array as PropType<string[]>,
      default: () => ["name"],
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    placeholderSearch: {
      type: String,
      default: "جستجو کنید",
    },
  },
  setup(props, { emit }) {
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
    const selected = ref();
    function selectItem(item: any) {
      if (props.selectable) {
        selected.value = item;
        emit("update:modelValue", item);
      }
    }
    // *****************************
    const { results } = useFuse(input, props.data, options);
    const { renderClass, attrsToBind } = useRenderClass("VSearchSelect");
    return { results, input, renderClass, attrsToBind, selectItem, selected };
  },
};
</script>

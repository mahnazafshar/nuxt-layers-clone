<template>
  <component
    :is="tag"
    @click="onClick"
    :data-name="isThTag ? 'container' : 'cardContainer'"
    :class="[
      renderClass(
        getVariantClass,
        isThTag ? 'container' : 'cardContainer',
        { 'cursor-pointer': item.sortable }
      ),
    ]"
    v-bind="attrsToBind"
  >
    <div
      :data-name="isThTag ? 'innerContainer' : 'cardInnerContainer'"
      :class="
        renderClass(
          'flex flex-row items-center',
          isThTag ? 'innerContainer' : 'cardInnerContainer'
        )
      "
    >
      <div
        :data-name="isThTag ? 'sort' : 'cardSort'"
        :class="
          renderClass('ml-2', isThTag ? 'sort' : 'cardSort', {
            hidden: item.key !== activeSort.key,
          })
        "
      >
        {{ activeSort.sort === SortEnum.ASC ? "sort-asc" : "" }}
        {{ activeSort.sort === SortEnum.DESC ? "sort-desc" : "" }}
      </div>

      <slot :item="item" :activeSort="activeSort">
        <div
          :data-name="isThTag ? 'label' : 'cardLabel'"
          :class="renderClass('', isThTag ? 'label' : 'cardLabel')"
        >
          {{ item.label }}
        </div>
      </slot>
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
export default defineComponent({
  name: "TTh",
  inheritAttrs: false,
  emits: ["sort"],
  props: {
    item: {
      type: Object as PropType<TableHeaderItem>,
      required: true,
    },
    activeSort: {
      type: Object as PropType<{ key: string; sort: TableSortEnum }>,
    },
    tag: {
      type: String,
      default: ()=> inject('t-table-th-tag', 'th'),
    },
  },
  setup(props, { emit, slots }) {
    const sortRef = ref<TableSortEnum>(TableSortEnum.DESC);
    const toggleSort = () => {
      const currentSort = props.activeSort?.sort ?? sortRef.value;
      if (currentSort === TableSortEnum.ASC) {
        sortRef.value = TableSortEnum.DESC;
      } else {
        sortRef.value = TableSortEnum.ASC;
      }
      return sortRef.value;
    };
    const onClick = (): void => {
      if (props.item.sortable) {
        emit("sort", { key: props.item.key, sort: toggleSort() });
      }
    };
    const getVariantClass = computed(() => {
      if (props.item.variant) {
        return `sm:bg-${props.item.variant}-50 sm:text-gray-700 text-${props.item.variant}`;
      }
      return "text-gray-700";
    });

    const isThTag = computed(() => props.tag === "th");
    const { renderClass, attrsToBind } = useRenderClass("TTableTh");
    return {
      renderClass,
      attrsToBind,
      isThTag,
      onClick,
      getVariantClass,
      SortEnum: TableSortEnum,
    };
  },
});
</script>

<style scoped></style>

<template>
  <template v-if="card && renderCard">
    <div
      data-name="cardBreakpoint"
      :class="renderClass('sm:hidden', 'cardBreakpoint')"
      v-bind="attrsToBind"
    >
      <template v-if="loading">
        <slot name="loading">loading...</slot>
      </template>
      <template v-else v-for="i in getLength" :key="`row-item-${i}`">
        <div
          data-name="cardContainer"
          :class="
            renderClass(
              `${getRowVariant(i)} m-3 relative bg-white`,
              'cardContainer',
              {
                'rounded-md': rounded,
              }
            )
          "
        >
          <div
            v-for="(headerItem, index) in getHeaders"
            :key="`td-item-${index}-${headerItem.key}`"
            data-name="cardCell"
            :class="[
              renderClass(
                `${getCellVariant(
                  i,
                  headerItem.key
                )} border-grey-100 border p-3`,
                'cardCell',
                {
                  'first:rounded-t-inherit last:rounded-b-inherit': rounded,
                  [hoverClass]: hover,
                  [stripedClass]: striped && i % 2 !== 0,
                }
              ),
            ]"
          >
            <template v-if="!slots[`cell(${headerItem.key})`] && !hasCellSlot">
              <div
                data-name="cardCellInnerContainer"
                :class="
                  renderClass(
                    'flex justify-between items-center',
                    'cardCellInnerContainer'
                  )
                "
              >
                <t-table-th
                  tag="div"
                  :key="`header-${index}-${headerItem.key}`"
                  :active-sort="activeSort"
                  @sort="onSort"
                  :item="headerItem"
                >
                  <template v-if="hasCardHeaderSlot" #default="data">
                    <div>
                      <slot name="header" v-bind="data"></slot>
                    </div>
                  </template>
                </t-table-th>
                <slot
                  v-if="index === 0"
                  name="counter"
                  :value="i"
                  :toggleDetails="
                    () => {
                      toggleDetails(i);
                    }
                  "
                >
                  <div
                    v-if="hasCardCounter && index === 0"
                    data-name="cardCounter"
                    :class="
                      renderClass(
                        'pl-2 whitespace-nowrap text-sm text-gray-500',
                        'cardCounter'
                      )
                    "
                  >
                    {{ i }}
                  </div>
                </slot>
              </div>

              <div>
                {{ getItems[i - 1][headerItem.key] }}
              </div>
            </template>
            <template v-else-if="slots[`cell(${headerItem.key})`]">
              <t-table-th
                tag="div"
                :key="`header-${index}-${headerItem.key}`"
                :active-sort="activeSort"
                @sort="onSort"
                :item="headerItem"
              >
                <template v-if="hasCardHeaderSlot" #default="data">
                  <div>
                    <slot name="header" v-bind="data"></slot>
                  </div>
                </template>
              </t-table-th>
              <slot
                :name="`cell(${headerItem.key})`"
                :column="index"
                :row="i - 1"
                :item="getItems[i - 1]"
                :itemKey="headerItem.key"
                :value="getItems[i - 1][headerItem.key]"
                :toggleDetails="
                  () => {
                    toggleDetails(i);
                  }
                "
              ></slot>
            </template>
            <template v-else>
              <slot
                v-if="index === 0"
                name="counter"
                :value="i"
                :toggleDetails="
                  () => {
                    toggleDetails(i);
                  }
                "
              >
                <div
                  v-if="hasCardCounter"
                  data-name="cardCounter"
                  :class="
                    renderClass(
                      'pl-2 whitespace-nowrap text-sm text-gray-500',
                      'cardCounter'
                    )
                  "
                >
                  {{ i }}
                </div>
              </slot>
              <t-table-th
                tag="div"
                :key="`header-${index}-${headerItem.key}`"
                :active-sort="activeSort"
                @sort="onSort"
                :item="headerItem"
              >
                <template v-if="hasCardHeaderSlot" #default="data">
                  <div>
                    <slot name="header" v-bind="data"></slot>
                  </div>
                </template>
              </t-table-th>
              <slot
                name="cell"
                :column="index"
                :row="i - 1"
                :item="getItems[i - 1]"
                :itemKey="headerItem.key"
                :value="getItems[i - 1][headerItem.key]"
                :toggleDetails="
                  () => {
                    toggleDetails(i);
                  }
                "
              ></slot>
            </template>
          </div>
        </div>
        <template v-if="hasRowDetailsSlot">
          <t-collapsable
            data-name="cardCollapse"
            :class="renderClass('', 'cardCollapse')"
            :show="getShowDetails(i)"
          >
            <slot
              name="rowDetails"
              :show="getShowDetails(i)"
              :isCard="false"
              :row="i - 1"
              :item="getItems[i - 1]"
              :toggleDetails="
                () => {
                  toggleDetails(i);
                }
              "
            ></slot>
          </t-collapsable>
        </template>
      </template>
    </div>
  </template>

  <template v-if="renderTable">
    <div
      data-name="breakpoint"
      :class="renderClass('', 'breakpoint', { 'hidden sm:block': card })"
      v-bind="attrsToBind"
    >
      <div
        data-name="container"
        :class="renderClass('overflow-x-auto scrollbar-sm', 'container')"
      >
        <div
          data-name="innerContainer"
          :class="
            renderClass(
              'align-middle inline-block min-w-full',
              'innerContainer'
            )
          "
        >
          <div
            data-name="shadowBox"
            :class="
              renderClass(
                'shadow overflow-hidden border-b border-gray-200',
                'shadowBox',
                { 'rounded-md': rounded }
              )
            "
          >
            <table
              data-name="table"
              :class="
                renderClass('min-w-full divide-y divide-gray-200', 'table')
              "
            >
              <thead
                data-name="thead"
                :class="renderClass('bg-gray-50', 'thead')"
              >
                <tr data-name="headTr" :class="renderClass('', 'headTr')">
                  <template v-if="hasCounter">
                    <t-table-th
                      key="counter"
                      :active-sort="activeSort"
                      @sort="onSort"
                      :item="{ key: '#', label: '#', sortable: false }"
                      scope="col"
                      data-name="headCounter"
                      :class="
                        renderClass(
                          'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                          'headCounter'
                        )
                      "
                    >
                      <template v-if="hasHeaderSlot" #default="data">
                        <div>
                          <slot name="header" v-bind="data"></slot>
                        </div>
                      </template>
                    </t-table-th>
                  </template>
                  <t-table-th
                    v-for="(headerItem, index) in getHeaders"
                    :key="`header-${index}-${headerItem.key}`"
                    :active-sort="activeSort"
                    @sort="onSort"
                    :item="headerItem"
                    scope="col"
                    data-name="headTh"
                    :class="
                      renderClass(
                        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                        'headTh'
                      )
                    "
                  >
                    <template v-if="hasHeaderSlot" #default="data">
                      <div>
                        <slot name="header" v-bind="data"></slot>
                      </div>
                    </template>
                  </t-table-th>
                </tr>
                <!--        </template>-->
              </thead>
              <tbody
                data-name="tbody"
                :class="
                  renderClass('bg-white', 'tbody', {
                    'divide-y divide-gray-200': divideY,
                  })
                "
              >
                <template v-if="loading">
                  <td
                    data-name="loadingContainer"
                    :class="renderClass('py-4', 'loadingContainer')"
                    :colspan="getHeaderLength"
                  >
                    <slot name="loading">loading...</slot>
                  </td>
                </template>
                <template v-else v-for="i in getLength" :key="`row-item-${i}`">
                  <tr
                    data-name="tr"
                    :class="[
                      renderClass(getRowVariant(i), 'tr', {
                        'divide-x divide-x-reverse': divideX,
                        [hoverClass]: hover,
                        [stripedClass]: striped && i % 2 !== 0,
                      }),
                    ]"
                    @mouseenter="onMouseenter(i)"
                    @mouseleave="onMouseleave(i)"
                  >
                    <td
                      v-if="hasCounter"
                      data-name="counter"
                      :class="
                        renderClass(
                          'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
                          'counter'
                        )
                      "
                    >
                      <slot
                        name="counter"
                        :value="i"
                        :toggleDetails="
                          () => {
                            toggleDetails(i);
                          }
                        "
                      >
                        {{ i }}
                      </slot>
                    </td>

                    <td
                      v-for="(headerItem, index) in getHeaders"
                      :key="`td-item-${index}-${headerItem.key}`"
                      data-name="td"
                      :class="
                        renderClass(
                          `${getCellVariant(
                            i,
                            headerItem.key
                          )} px-6 py-4 whitespace-nowrap text-sm text-gray-500`,
                          'td'
                        )
                      "
                    >
                      <template
                        v-if="!slots[`cell(${headerItem.key})`] && !hasCellSlot"
                      >
                        {{ getItems[i - 1][headerItem.key] }}
                      </template>
                      <template v-else-if="slots[`cell(${headerItem.key})`]">
                        <slot
                          :name="`cell(${headerItem.key})`"
                          :column="index"
                          :row="i - 1"
                          :item="getItems[i - 1]"
                          :itemKey="headerItem.key"
                          :value="getItems[i - 1][headerItem.key]"
                          :toggleDetails="
                            () => {
                              toggleDetails(i);
                            }
                          "
                        ></slot>
                      </template>
                      <template v-else>
                        <slot
                          name="cell"
                          :column="index"
                          :row="i - 1"
                          :item="getItems[i - 1]"
                          :itemKey="headerItem.key"
                          :value="getItems[i - 1][headerItem.key]"
                          :toggleDetails="
                            () => {
                              toggleDetails(i);
                            }
                          "
                        ></slot>
                      </template>
                    </td>
                  </tr>
                  <template v-if="hasRowDetailsSlot">
                    <tr
                      data-name="detailsTr"
                      :class="renderClass('', 'detailsTr')"
                    >
                      <td
                        data-name="detailsTd"
                        :class="renderClass('', 'detailsTd')"
                        :colspan="getHeaderLength"
                      >
                        <t-collapsable :show="getShowDetails(i)">
                          <slot
                            name="rowDetails"
                            :show="getShowDetails(i)"
                            :isCard="false"
                            :row="i - 1"
                            :item="getItems[i - 1]"
                            :toggleDetails="
                              () => {
                                toggleDetails(i);
                              }
                            "
                          ></slot>
                        </t-collapsable>
                      </td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
export default defineComponent({
  name: "TTable",
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<TableItem[]>,
      default: () => [],
    },
    fields: {
      type: Array as PropType<TableHeaderItem[]>,
    },
    localSort: {
      type: Boolean,
      default: () => inject("t-table-localSort", true),
    },
    rounded: {
      type: Boolean,
      default: () => inject("t-table-rounded", true),
    },
    card: {
      type: Boolean,
      default: () => inject("t-table-card", true),
    },
    renderTable: {
      type: Boolean,
      default: () => inject("t-table-renderTable", true),
    },
    renderCard: {
      type: Boolean,
      default: () => inject("t-table-renderCard", true),
    },
    loading: {
      type: Boolean,
      default: () => inject("t-table-loading", false),
    },
    loadingText: {
      type: String,
      default: () => inject("t-table-loadingText", "Loading"),
    },
    loadingProps: {
      type: Object,
      default: () =>
        inject("t-table-loadingProps", {
          colorClass: "border-gray-300",
          size: "md",
          type: "spinner",
        }),
    },
    divideX: {
      type: Boolean,
      default: () => inject("t-table-divideX", true),
    },
    divideY: {
      type: Boolean,
      default: () => inject("t-table-divideY", true),
    },
    hasCounter: {
      type: Boolean,
      default: () => inject("t-table-hasCounter", true),
    },
    hasCardCounter: {
      type: Boolean,
      default: () => inject("t-table-hasCardCounter", true),
    },
    hover: {
      type: Boolean,
      default: () => inject("t-table-hover", true),
    },
    hoverClass: {
      type: String,
      default: () => inject("t-table-hoverClass", "hover:bg-gray-100"),
    },
    striped: {
      type: Boolean,
      default: () => inject("t-table-striped", false),
    },
    stripedClass: {
      type: String,
      default: () => inject("t-table-stripedClass", "bg-gray-50"),
    },
    defaultSort: {
      type: Object as PropType<{ key: string; sort: TableSortEnum }>,
      default: () =>
        inject("t-table-activeSort", {
          key: "",
          sort: "" as TableSortEnum,
        }),
    },
    resetExpand: {
      type: [Number, String, Object, Array],
      default: () => inject("t-table-resetExpand", 0),
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sort(_: { key: string; sort: TableSortEnum; setSort: Function }) {
      return true;
    },
    closeExpand: () => {
      return true;
    },
  },
  setup(props, { emit, slots }) {
    const { getHeaders, getHeaderLength } = useTableHeader(props);
    const getLength = computed(() => props.items.length);
    const hasRowDetailsSlot = !!slots.rowDetails;
    const resetFlag = ref(false);
    const resetShowDetails = () => {
      if (hasRowDetailsSlot) {
        resetFlag.value = true;
      }
    };

    onMounted(() => {
      emit("closeExpand", resetShowDetails);
    });
    watch(
      () => props.resetExpand,
      () => {
        resetShowDetails();
      }
    );

    const { getItems, onSort, activeSort } = useTableSort(
      props,
      { emit },
      resetShowDetails
    );
    const { getRowVariant, getCellVariant, onMouseenter, onMouseleave } =
      useTableVariant(getItems, props.hover);
    const { getShowDetails, toggleDetails } = useShowDetails(
      getItems,
      resetFlag
    );
    const { renderClass, attrsToBind } = useRenderClass("TTable");
    return {
      renderClass,
      attrsToBind,
      onMouseenter,
      onMouseleave,
      hasRowDetailsSlot,
      hasCellSlot: !!slots.cell,
      hasHeaderSlot: !!slots.header,
      hasCardHeaderSlot: !!slots["header"],
      activeSort,
      slots,
      toggleDetails,
      getShowDetails,
      getHeaders,
      getHeaderLength: getHeaderLength.value + (props.hasCounter ? 1 : 0),
      getLength,
      onSort,
      getItems,
      getRowVariant,
      getCellVariant,
    };
  },
});
</script>

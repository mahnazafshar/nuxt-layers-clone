<template>
  <div class="w-full overflow-x-auto" v-bind="attrsToBind">
    <section
      data-name="container"
      :class="
        renderClass(
          'flex justify-between bg-white py-3 text-gray-700',
          'container'
        )
      "
    >
      <ul
        data-name="ul"
        :class="renderClass('flex items-center mx-auto', 'ul')"
      >
        <li
          data-name="li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasPrev"
        >
          <a
            data-name="anchor"
            :class="renderClass('', 'anchor')"
            href="#"
            @click.prevent="changePage(prevPage)"
          >
            <span
              data-name="itemContainer"
              :class="
                renderClass(
                  'flex items-center justify-center rounded-full hover:opacity-80  sm:h-10 sm:w-10 h-8 w-8',
                  'itemContainer'
                )
              "
            >
              <span
                data-name="iconContainer"
                :class="renderClass('', 'iconContainer')"
                data-test-id="prev"
              >
                <slot name="prev">
                  <svg
                    data-name="icon"
                    :class="renderClass('w-4 h-4 sm:h-5 sm:w-5', 'icon')"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </slot>
              </span>
            </span>
          </a>
        </li>
        <li
          data-name="li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasFirst"
        >
          <a
            data-name="anchor"
            :class="renderClass('', 'anchor')"
            href="#"
            @click.prevent="changePage(1)"
          >
            <slot name="item" :value="1">
              <span
                data-name="itemContainer"
                :class="
                  renderClass(
                    'flex items-center justify-center rounded-full hover:opacity-80 sm:h-10 sm:w-10 h-8 w-8',
                    'itemContainer'
                  )
                "
              >
                <slot name="page" :value="1">
                  <span
                    data-name="page"
                    :class="renderClass('', 'page')"
                  >
                    1
                  </span>
                </slot>
              </span></slot
            >
          </a>
        </li>
        <li
          data-name="li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasFirst"
        >
          ...
        </li>
        <li
          data-name="li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-for="(page, index) in pages"
          :key="`page-${index}`"
        >
          <component
            data-name="anchor"
            :is="is"
            v-bind="dynamicBinding(page)"
            :class="renderClass('cursor-pointer', 'anchor')"
            @[eventPrevent].prevent="changePage(page)"
            :data-test-id="`page-${page}`"
          >
            <!--            v-bind="dynamicBind"-->
            <!--            href="#"-->

            <slot name="item" :value="page" :activeValue="getModelValue">
              <span
                data-name="itemContainer"
                :class="
                  renderClass(
                    'flex items-center justify-center rounded-full hover:opacity-80  sm:h-10 sm:w-10 h-8 w-8',
                    'itemContainer',
                    { [`${getColorClass} text-white`]: getModelValue === page }
                  )
                "
              >
                <slot name="page" :value="page" :activeValue="getModelValue">
                  <span
                    data-name="page"
                    :class="renderClass('', 'page')"
                    >{{ page }}</span
                  >
                </slot>
              </span>
            </slot>
          </component>
        </li>
        <li
          data-name="li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasLast"
        >
          ...
        </li>
        <li
          data-name="li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasLast"
        >
          <a
            data-name="anchor"
            :class="renderClass('', 'anchor')"
            href="#"
            @click.prevent="changePage(totalPages)"
          >
            <slot name="item" :value="totalPages">
              <span
                data-name="itemContainer"
                :class="
                  renderClass(
                    'flex items-center justify-center rounded-full hover:opacity-80  sm:h-10 sm:w-10 h-8 w-8',
                    'itemContainer'
                  )
                "
              >
                <slot name="page" :value="totalPages">
                  <span
                    data-name="page"
                    :class="renderClass('', 'page')"
                  >
                    {{ totalPages }}
                  </span>
                </slot>
              </span></slot
            >
          </a>
        </li>
        <li
          data-name="li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasNext"
        >
          <a
            data-name="anchor"
            :class="renderClass('', 'anchor')"
            href="#"
            @click.prevent="changePage(nextPage)"
          >
            <span
              data-name="itemContainer"
              :class="
                renderClass(
                  'flex items-center justify-center rounded-full hover:opacity-80  sm:h-10 sm:w-10 h-8 w-8',
                  'itemContainer'
                )
              "
            >
              <span
                data-name="iconContainer"
                :class="renderClass('', 'iconContainer')"
                data-test-id="next"
              >
                <slot name="next">
                  <svg
                    data-name="icon"
                    :class="renderClass('w-4 h-4 sm:h-5 sm:w-5', 'icon')"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </slot>
              </span>
            </span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "TPagination",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: () => inject("t-pagination-perPage", 20),
    },
    pageRange: {
      type: Number,
      default: () => inject("t-pagination-pageRange", 2),
    },
    variant: {
      type: String,
      default: () => inject("t-pagination-variant", "primary"),
      validator: (propValue: string) => {
        return !!Variants[propValue];
      },
    },
    colorClass: {
      type: String,
      default: () => inject("t-pagination-colorClass", ""),
    },
    withQuery: {
      type: Boolean,
      default: () => inject("t-pagination-withQuery", true),
    },

    queryName: {
      type: String,
      default: () => inject("t-pagination-queryName", "page"),
    },
    appendQuery: {
      type: Boolean,
      default: () => inject("t-pagination-appendQuery", true),
    },
    formName: {
      type: String,
      default: () => inject("t-pagination-formName", ""),
    },
  },
  setup(props, { emit, slots }) {
    const route = useRoute();
    const getModelValue = computed((): number => {
      if (props.withQuery) {
        if (
          route.query[props.queryName] ||
          route.query[props.formName]?.[props.queryName]
        ) {
          if (props.formName) {
            return +route.query[props.formName]?.[props.queryName] || 1;
          } else {
            return +route.query[props.queryName]!;
          }
        } else return 1;
        // if (route.query[props.queryName]) {
        //   if (props.formName) {
        //     return +route.query[props.formName]?.[props.queryName] || 1;
        //   } else {
        //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        //     return +route.query[props.queryName]!;
        //   }
        // } else {
        //   return 1;
        // }
      }
      return props.modelValue;
    });
    const totalPages = computed(() => {
      return Math.ceil(props.totalCount / props.perPage);
    });
    const rangeStart = computed(() => {
      const start = getModelValue.value - props.pageRange;
      return start > 0 ? start : 1;
    });
    const rangeEnd = computed(() => {
      const end = getModelValue.value + props.pageRange;
      if (end < totalPages.value) {
        return end;
      } else {
        return totalPages.value;
      }
    });
    const pages = computed(() => {
      const pages: number[] = [];
      for (let i = rangeStart.value; i <= rangeEnd.value; i++) {
        pages.push(i);
      }
      return pages;
    });

    const hasFirst = computed(() => rangeStart.value !== 1);
    const hasLast = computed(() => rangeEnd.value < totalPages.value);
    const hasPrev = computed(() => getModelValue.value > 1);
    const hasNext = computed(() => getModelValue.value < totalPages.value);

    const nextPage = computed(() => getModelValue.value + 1);
    const prevPage = computed(() => getModelValue.value - 1);

    const dynamicBinding = computed(() => (page) => {
      if (props.withQuery) {
        const append = props.appendQuery ? route.query : {};
        const pageQuery = props.formName
          ? { [props.formName]: { [props.queryName]: page } }
          : { [props.queryName]: page };
        return {
          to: {
            query: {
              ...append,
              ...pageQuery,
            },
          },
        };
      }
      return { href: "#" };
    });

    const router = useRouter();
    const changePage = (page) => {
      if (page > 0 && page <= totalPages.value) {
        emit("update:modelValue", page);
      }
      const link = dynamicBinding.value(page);

      if (link.to) {
        router.push(link.to);
      }
    };
    const getColorClass = computed(() => {
      if (props.colorClass) {
        return props.colorClass;
      }
      return `bg-${props.variant}`;
    });
    const is = computed(() => {
      if (props.withQuery) {
        return resolveComponent("nuxtLink");
      }
      return "a";
    });
    const { renderClass, attrsToBind } = useRenderClass("TPagination");
    return {
      getModelValue,
      is,
      dynamicBinding,
      eventPrevent: props.withQuery ? null : "click",
      getColorClass,
      renderClass,
      attrsToBind,
      pages,
      changePage,
      totalPages,
      hasPrev,
      hasNext,
      nextPage,
      prevPage,
      hasFirst,
      hasLast,
    };
  },
});
</script>

<style scoped></style>

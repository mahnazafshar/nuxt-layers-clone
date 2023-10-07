<template>
  <div
    data-name="container"
    :class="renderClass('flex flex-col items-center space-y-4', 'container')"
    v-bind="attrsToBind"
  >
    <div
      data-name="headerContainer"
      :class="renderClass('flex max-w-full items-center', 'headerContainer')"
    >
      <div v-if="showArrows" @click="onScrollRight">
        <template v-if="hasRightArrowSlot">
          <slot name="arrowRight" :disabled="endIntersecting"></slot>
        </template>
        <div
          v-else
          :disabled="startIntersecting"
          name="keyboard_arrow_right"
          data-name="arrow"
          :class="
            renderClass('cursor-pointer self-center fill-current', 'arrow', {
              'opacity-50': startIntersecting,
            })
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
          >
            <path
              d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
            />
          </svg>
        </div>
      </div>
      <nav
        ref="navRef"
        data-name="nav"
        :class="
          renderClass(
            'flex items-center flex-row max-w-full overflow-x-auto scrollbar-hidden py-1',
            'nav'
          )
        "
      >
        <div ref="startItem" class="w-1 h-1 px-1"></div>
        <template v-if="hasTitleSlot">
          <div
            v-for="(tab, index) in tabs"
            :key="`${index}-${tab.props.title}`"
            @click="selectTab(index, tab, $event)"
          >
            <slot
              name="title"
              :selected="index === selectedIndex"
              :title="tab.props.title"
              v-bind="tab.props"
            ></slot>
          </div>
        </template>
        <button
          v-else
          v-for="(tab, index) in tabs"
          :key="`${index}-${tab.props.title}`"
          :data-value="tab.props.value || index"
          @click="selectTab(index, tab, $event)"
          data-name="header"
          type="button"
          :class="[
            renderClass(
              `${
                index === selectedIndex
                  ? `text-${variant} border-b-2 font-medium border-${variant}`
                  : ''
              } text-gray-600 min-w-max py-4 px-6 block  md:hover:text-blue-500 focus:outline-none`,
              'header'
            ),
          ]"
        >
          {{ tab.props.title }}
        </button>
        <div ref="endItem" class="w-1 h-1 px-1"></div>
        <slot name="append"></slot>
      </nav>
      <div v-if="showArrows" @click="onScrollLeft">
        <template v-if="hasLeftArrowSlot">
          <slot name="arrowLeft" :disabled="endIntersecting"></slot>
        </template>
        <div
          v-else
          :disabled="endIntersecting"
          name="keyboard_arrow_left"
          data-name="arrow"
          :class="
            renderClass('cursor-pointer self-center fill-current', 'arrow', {
              'opacity-50': endIntersecting,
            })
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
          >
            <path
              d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { provide, VNode } from "vue";
import { useEventListener, useIntersectionObserver } from "@vueuse/core";
interface TabProps {
  title: string;
  value?: string | number;
}
export interface TabProvider {
  selectedIndex: number;
  tabs: VNode<TabProps>[];
  count: number;
}

export default defineComponent({
  name: "TTabs",
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: 0 },
    arrows: {
      type: Boolean,
      default: () => inject("t-tabs-arrows", false),
    },
    variant: {
      type: String,
      default: () => inject("t-tabs-variant", "primary"),
    },
  },
  setup(props, { slots, emit }) {
    const state = reactive<TabProvider>({
      selectedIndex: 0,
      tabs: [] as VNode<TabProps>[],
      count: 0,
    });

    provide("TabsProvider", state);

    const selectTab = (i: number, tab, e) => {
      e.target.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      emit("update:modelValue", tab.props.value || i);
    };
    const renderChildren = () => {
      // console.log('renderChildren', slots.default());
      if (slots.default) {
        const tabs: any[] = [];
        for (const item of slots.default()) {
          //@ts-ignore
          if (item.type.name === "TTabItem") {
            tabs.push(item);
          } else if (Array.isArray(item.children)) {
            for (const child of item.children) {
              //@ts-ignore
              if (child.type.name === "TTabItem") {
                tabs.push(child);
              }
            }
          }
        }
        //@ts-ignore
        state.tabs = slots.default().filter((child) => {
          //@ts-ignore
          return child.type.name === "TTabItem";
        });
        state.tabs = tabs;
        const selectedIndex = state.tabs.findIndex(
          (item) => item?.props?.value === props.modelValue
        );
        if (selectedIndex !== -1) {
          state.selectedIndex = selectedIndex;
        } else if (typeof props.modelValue === "number") {
          state.selectedIndex = props.modelValue;
        }
      }
    };
    watch(
      () => props.modelValue,
      () => {
        renderChildren();
      },
      { immediate: true }
    );

    const tabsLength = computed(() => state.tabs.length);

    const { elementRef: navRef, scrollLeft, scrollRight } = useScrollElement();
    const onScrollLeft = () => {
      scrollLeft(navRef.value.clientWidth, 200);
    };
    const onScrollRight = () => {
      scrollRight(navRef.value.clientWidth, 200);
    };

    const startItem = ref(null);
    const startIntersecting = ref(false);
    useIntersectionObserver(startItem, ([{ isIntersecting }]) => {
      startIntersecting.value = isIntersecting;
    });

    const endItem = ref(null);
    const endIntersecting = ref(false);
    useIntersectionObserver(endItem, ([{ isIntersecting }]) => {
      endIntersecting.value = isIntersecting;
    });
    const hasHorizontalScroll = ref(false);
    const handleScrollWidth = () => {
      const clientWidth = (navRef.value as Element).clientWidth;
      const scrollWidth = (navRef.value as Element).scrollWidth;
      if (scrollWidth > clientWidth) {
        hasHorizontalScroll.value = true;
      } else {
        hasHorizontalScroll.value = false;
      }
    };
    onMounted(handleScrollWidth);

    useEventListener("resize", () => {
      handleScrollWidth();
    });

    const showArrows = computed(
      () =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        props.arrows && hasHorizontalScroll.value
    );

    const { renderClass, attrsToBind } = useRenderClass("TTabs");
    return {
      hasTitleSlot: !!slots.title,
      startIntersecting,
      endIntersecting,
      startItem,
      endItem,
      ...toRefs(state),
      selectTab,
      onScrollLeft,
      onScrollRight,
      showArrows,
      navRef,
      renderClass,
      attrsToBind,
      hasRightArrowSlot: !!slots.arrowRight,
      hasLeftArrowSlot: !!slots.arrowLeft,
    };
  },
});
</script>

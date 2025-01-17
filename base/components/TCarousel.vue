<template>
  <!-- clickNextIsDisabled:{{ clickNextIsDisabled }}
  clickPrevIsDisabled:
  {{ clickPrevIsDisabled }} -->
  <div
    :dir="isRtl ? 'rtl' : 'ltr'"
    data-name="container"
    :class="renderClass('relative', 'container')"
    v-bind="attrsToBind"
  >
    <template v-if="arrows">
      <slot
        :name="isRtl ? 'next' : 'prev'"
        :activator="isRtl ? clickNext : clickPrev"
        :disabled="isRtl ? clickNextIsDisabled : clickPrevIsDisabled"
      >
        <button
          :data-name="isRtl ? 'next' : 'prev'"
          :data-name-disabled="isRtl ? 'nextDisabled' : 'prevDisabled'"
          :class="[
            renderClass(
              'w-6 h-6 z-10 absolute top-1/2 left-5 transform -translate-y-1/2',
              isRtl ? 'next' : 'prev'
            ),
            renderClass('', isRtl ? 'nextDisabled' : 'prevDisabled', {
              'opacity-30': isRtl ? clickNextIsDisabled : clickPrevIsDisabled,
            }),
          ]"
          @click="() => (isRtl ? clickNext() : clickPrev())"
        >
          <!-- <chevron-right-icon class="w-8"></chevron-right-icon> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </slot>

      <slot
        :name="isRtl ? 'prev' : 'next'"
        :activator="isRtl ? clickPrev : clickNext"
        :disabled="isRtl ? clickPrevIsDisabled : clickNextIsDisabled"
      >
        <button
          :data-name="isRtl ? 'prev' : 'next'"
          :data-name-disabled="isRtl ? 'prev-disabled' : 'next-disabled'"
          :class="[
            renderClass(
              'w-6 h-6 z-10 absolute top-1/2 right-5 transform -translate-y-1/2',
              isRtl ? 'prev' : 'next'
            ),
            renderClass('', isRtl ? 'prev-disabled' : 'next-disabled', {
              'opacity-30': isRtl ? clickPrevIsDisabled : clickNextIsDisabled,
            }),
          ]"
          @click="() => (isRtl ? clickPrev() : clickNext())"
        >
          <!-- <chevron-left-icon class="w-8"></chevron-left-icon> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </slot>
    </template>

    <div
      data-name="wrapperParent"
      :class="renderClass('overflow-x-hidden', 'wrapperParent')"
    >
      <div
        ref="sliderWrapperRef"
        data-name="wrapper"
        :class="
          renderClass('flex', 'wrapper', {
            'overflow-x-auto scroll-smooth carousel-wrapper-when-native-scrollbar-enabled':
              shouldUseNativeScroll,
          })
        "
      >
        <template v-for="(item, index) in items" :key="index">
          <div
            :ref="(el) => setChildrenRef(el, index)"
            :class="[
              { 'py-2 px-1.5 first:pr-3 last:pl-3': defaultPadding },
              itemContainerClass,
            ]"
          >
            <slot
              name="item"
              :middle="middleItemRef"
              :item="item"
              :index="index"
            />
          </div>
        </template>
      </div>
    </div>
    <slot name="pagination">
      <div
        v-if="slider"
        data-name="pagination"
        :class="
          renderClass(
            'absolute bottom-5 left-1/2 transition -translate-x-1/2 z-10 flex flex-row',
            'pagination'
          )
        "
        @click.prevent.stop=""
      >
        <template
          v-for="(_, index) in items"
          :key="`slider-pagination-${index}`"
        >
          <div
            data-name="page"
            :class="[
              { [pageActiveClass]: index == middleItemRef },
              renderClass(
                'w-2 h-2 mx-1 rounded-full border border-white cursor-pointer',
                'page'
              ),
            ]"
            @click="setActiveIndexMiddle(index)"
          />
        </template>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import { useEventListener, useIntervalFn } from "@vueuse/core";
import { useDirection } from "../composables/useDirection";

export default defineComponent({
  name: "TCarousel",
  inheritAttrs: false,
  props: {
    items: { type: Array, default: () => [] },
    slider: {
      type: Boolean,
      default: () => inject("t-carousel-slider", false),
    },
    arrows: {
      type: Boolean,
      default: () => inject("t-carousel-arrows", true),
    },
    defaultPadding: {
      type: Boolean,
      default: () => inject("t-carousel-defaultPadding", true),
    },
    itemContainerClass: {
      type: [Array, Object, String],
      default: () => inject("t-carousel-itemContainerClass", ""),
    },
    config: {
      type: Object,
      default: () =>
        inject("t-carousel-config", { duration: 1, ease: "power1" }),
    },
    middle: {
      type: Number,
      default: () => inject("t-carousel-middle", -1),
    },
    end: {
      type: Number,
      default: () => inject("t-carousel-end", -1),
    },
    start: {
      type: Number,
      default: () => inject("t-carousel-start", -1),
    },
    allowContextMenu: {
      type: Boolean,
      default: () => inject("t-carousel-allowContextMenu", true),
    },
    autoPlayInterval: {
      type: Number,
      default: () => inject("t-carousel-autoPlayInterval", -1),
    },
    pageActiveClass: {
      type: String,
      default: "bg-white",
    },
    useNativeScroll: {
      type: Boolean,
      default: () => inject("t-carousel-useNativeScroll", false),
    },
  },
  emits: ["update:middle"],
  setup(props, { emit }) {
    const shouldUseNativeScroll = computed(
      () => props.useNativeScroll && !props.slider
    );
    const { isRtl } = useDirection();
    const sliderWrapperRef = ref<any>(null);
    const childrenRef = ref<any>([]);
    const setChildrenRef = (el: any, index: number) => {
      if (el) childrenRef.value[index] = el;
    };

    onBeforeUpdate(() => {
      childrenRef.value = [];
    });
    const getConfig = () => {
      const el = unref(sliderWrapperRef);
      const maxX: number = el?.scrollWidth - el?.clientWidth;
      // console.log("maxX", maxX, el!.scrollWidth, el!.clientWidth);
      return { el, maxX: maxX * (unref(isRtl) ? 1 : -1) };
    };
    const clickNextIsDisabled = ref(false);
    const clickPrevIsDisabled = ref(false);

    const toggleNextPrevDisabled = () => {
      if (props.slider) {
        clickNextIsDisabled.value =
          unref(middleItemRef.value) == props.items.length - 1;
        clickPrevIsDisabled.value = unref(middleItemRef.value) == 0;
      } else {
        const x = +gsap.getProperty(unref(sliderWrapperRef), "x");
        const { maxX } = getConfig();
        clickNextIsDisabled.value = x == +maxX;
        clickPrevIsDisabled.value = x == 0;
      }
    };
    onMounted(() => {
      toggleNextPrevDisabled();
    });
    const getX = () => {
      const { el } = getConfig();
      if (unref(shouldUseNativeScroll)) {
        return unref(el).scrollLeft * -1;
      }

      return gsap.getProperty(unref(el), "x");
    };
    const setX = (x: number, duration = -1) => {
      const { el } = getConfig();
      if (unref(shouldUseNativeScroll)) {
        unref(el).scrollLeft = x * -1;
      } else {
        gsap.to(unref(el), {
          x,
          overwrite: true,
          ...props.config,
          ...(duration > 0 ? { duration } : {}),
          onComplete: toggleNextPrevDisabled,
        });
      }
    };
    const recalculate = () => {
      if (!unref(shouldUseNativeScroll)) {
        const { el, maxX } = getConfig();
        //@ts-ignore
        Draggable.get(unref(el)).applyBounds({ minX: 0, maxX });
      }
    };
    onUpdated(() => {
      recalculate();
    });
    const getValidX = (x: number) => {
      const { maxX } = getConfig();
      if (!unref(isRtl)) {
        if (x > 0) return 0;
        if (x < maxX) {
          return maxX;
        }
        return x;
      }
      if (x < 0) return 0;
      if (x > maxX) {
        return maxX;
      }
      return x;
    };
    const getPrevItemsWidth = (activeIndex: number): number => {
      let xDistance = 0;
      for (let i = 0; i < activeIndex; i++) {
        xDistance += childrenRef.value[i].clientWidth;
      }
      return xDistance * (unref(isRtl) ? 1 : -1);
    };
    const getVisibleBack = (activeIndex: number): number => {
      const { el } = getConfig();
      const visibleBack =
        (unref(el)?.clientWidth || 0) -
        childrenRef.value[activeIndex].clientWidth;
      return visibleBack * (unref(isRtl) ? 1 : -1);
    };
    const setActiveIndexStart = (activeIndex: number) => {
      //move to first item
      if (childrenRef.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        setX(getValidX(xDistance));
      }
    };
    const setActiveIndexEnd = (activeIndex: number) => {
      //move to last item
      if (childrenRef.value[activeIndex]) {
        const xDistance = getPrevItemsWidth(activeIndex);
        const visibleBack = getVisibleBack(activeIndex);
        setX(getValidX(xDistance - visibleBack));
      }
    };
    const middleItemRef = ref(-1);
    const setActiveIndexMiddle = (activeIndex: number, duration = -1) => {
      //move to middle item
      if (childrenRef.value[activeIndex]) {
        const xDistance = getPrevItemsWidth(activeIndex);
        const visibleBack = getVisibleBack(activeIndex);
        setX(getValidX(xDistance - visibleBack / 2), duration);
        middleItemRef.value = activeIndex;
        emit("update:middle", activeIndex);
      }
    };

    const witchItemIsStart = () => {
      const currentX = Math.abs(+getX());
      if (currentX == 0) {
        return 0;
      }
      let index = 0;
      let xDistance = childrenRef.value[index].clientWidth;

      while (currentX > xDistance || index == props.items.length - 1) {
        xDistance += childrenRef.value[index]?.clientWidth;
        index++;
      }
      return Math.min(index, props.items.length - 1);
    };
    const witchItemIsMiddle = () => {
      const { el } = getConfig();

      let currentX = Math.abs(+getX());
      currentX += (unref(el)?.clientWidth || 0) / 2;
      if (currentX == 0) {
        return 0;
      }
      let index = 0;
      let xDistance = childrenRef.value[index]?.clientWidth;

      while (currentX > xDistance || index == props.items.length - 1) {
        xDistance += childrenRef.value[index]?.clientWidth;
        index++;
      }
      return Math.min(index, props.items.length - 1);
    };
    const witchItemIsEnd = () => {
      const { el } = getConfig();

      let currentX = Math.abs(+getX());
      currentX += unref(el)?.clientWidth || 0;
      if (currentX == 0) {
        return 0;
      }
      let index = 0;
      let xDistance = childrenRef.value[index].clientWidth;

      while (currentX > xDistance || index == props.items.length - 1) {
        xDistance += childrenRef.value[index]?.clientWidth;
        index++;
      }
      return Math.min(index, props.items.length - 1);
    };
    const setMiddleIfIsSlider = () => {
      if (props.slider) {
        const index = witchItemIsMiddle();
        setActiveIndexMiddle(index, 0.2);
      }
    };

    watch(
      () => props.start,
      (value) => {
        setActiveIndexStart(value);
      }
    );
    watch(
      () => props.middle,
      (value) => {
        setActiveIndexMiddle(value);
      }
    );
    watch(
      () => props.end,
      (value) => {
        setActiveIndexEnd(value);
      }
    );
    const clickNext = (duration = -1) => {
      if (props.slider) {
        setActiveIndexMiddle(unref(middleItemRef.value) + 1, duration);
        return;
      }
      const { el } = getConfig();
      const currentX = getX();
      const plusX = unref(el)!.clientWidth;
      setX(getValidX(unref(isRtl) ? +currentX + plusX : +currentX - plusX));
    };
    const clickPrev = (duration = -1) => {
      if (props.slider) {
        setActiveIndexMiddle(unref(middleItemRef.value) - 1, duration);
        return;
      }
      const { el } = getConfig();
      const currentX = getX();
      const plusX = unref(el)!.clientWidth;
      setX(getValidX(unref(isRtl) ? +currentX - plusX : +currentX + plusX));
    };
    onMounted(() => {
      if (!unref(shouldUseNativeScroll)) {
        gsap.registerPlugin(Draggable);
        const { el, maxX } = getConfig();
        let isDragging = false;
        Draggable.create(unref(el), {
          type: "x",
          edgeResistance: 0.9,
          allowContextMenu: props.allowContextMenu,
          //@ts-ignore
          bounds: { minX: 0, maxX },
          throwProps: true,
          minimumMovement: 10,
          onDragStart() {
            isDragging = true;
          },
          onDragEnd() {
            isDragging = false;
          },
        });
        setMiddleIfIsSlider();
        // myDraggable[0].disable();

        useDraggableSmoother(el, {
          getValidX,
          onStart: () => {
            isDragging = true;
          },
          onComplete: () => {
            setTimeout(() => {
              isDragging = false;
            }, props.autoPlayInterval);
            // myDraggable[0].enable();
            toggleNextPrevDisabled();
          },
          onReleased({ speed, distance, distanceY, direction }) {
            if (!props.slider) {
              return true;
            }
            if (speed > 8 && distance > 8 && distanceY < 30) {
              if (direction == "right") {
                clickNext(0.2);
              } else {
                clickPrev(0.2);
              }
            } else {
              setMiddleIfIsSlider();
            }
            return false;
          },
        });
        useEventListener(window, "resize", recalculate);
        if (props.autoPlayInterval > 0) {
          useIntervalFn(() => {
            if (isDragging) {
              return;
            }
            if (!childrenRef.value[unref(middleItemRef) + 1]) {
              middleItemRef.value = -1;
              clickNext(0.2);
            } else {
              clickNext();
            }
          }, props.autoPlayInterval);
        }
      }
    });
    const { renderClass, attrsToBind } = useRenderClass("TCarousel");
    return {
      isRtl,
      clickNextIsDisabled,
      clickPrevIsDisabled,
      attrsToBind,
      renderClass,
      middleItemRef,
      setActiveIndexMiddle,
      clickNext,
      clickPrev,
      sliderWrapperRef,
      setChildrenRef,
      shouldUseNativeScroll,
    };
  },
});
</script>

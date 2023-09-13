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

    <div class="overflow-x-hidden">
      <div
        ref="sliderWrapperRef"
        data-name="wrapper"
        :class="renderClass('flex', 'wrapper')"
      >
        <template v-for="(item, index) in items" :key="index">
          <div
            :ref="(el) => setChildrenRef(el, index)"
            :class="[
              { 'py-2 px-1.5 first:pr-3 last:pl-3': defaultPadding },
              itemContainerClass,
            ]"
          >
            <slot name="item" :item="item" :index="index" />
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
  },
  emits: ["update:middle"],
  setup(props, { emit }) {
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
    const onAnimationComplete = () => {
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
    const recalculate = () => {
      const { el, maxX } = getConfig();
      //@ts-ignore
      Draggable.get(unref(el)).applyBounds({ minX: 0, maxX });
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
        gsap.to(unref(el), {
          x: getValidX(xDistance),
          overwrite: true,
          ...props.config,
          onComplete: onAnimationComplete,
        });
      }
    };
    const setActiveIndexEnd = (activeIndex: number) => {
      //move to last item
      if (childrenRef.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        const visibleBack = getVisibleBack(activeIndex);
        gsap.to(unref(el), {
          x: getValidX(xDistance - visibleBack),
          overwrite: true,
          ...props.config,
          onComplete: onAnimationComplete,
        });
      }
    };
    const middleItemRef = ref(-1);
    const setActiveIndexMiddle = (activeIndex: number, duration = -1) => {
      //move to middle item
      if (childrenRef.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        const visibleBack = getVisibleBack(activeIndex);
        gsap.to(unref(el), {
          x: getValidX(xDistance - visibleBack / 2),
          overwrite: true,
          ...props.config,
          duration: duration >= 0 ? duration : props.config.duration,
          onComplete: onAnimationComplete,
        });
        middleItemRef.value = activeIndex;
        emit("update:middle", activeIndex);
      }
    };

    const witchItemIsStart = () => {
      const { el } = getConfig();

      const currentX = Math.abs(+gsap.getProperty(unref(el), "x"));
      if (currentX == 0) {
        return 0;
      }
      let index = 0;
      let xDistance = childrenRef.value[index].clientWidth;

      while (currentX > xDistance || index == props.items.length - 1) {
        xDistance += childrenRef.value[index].clientWidth;
        index++;
      }
      return index;
    };
    const witchItemIsMiddle = () => {
      const { el } = getConfig();

      let currentX = Math.abs(+gsap.getProperty(unref(el), "x"));
      currentX += (unref(el)?.clientWidth || 0) / 2;
      if (currentX == 0) {
        return 0;
      }
      let index = 0;
      let xDistance = childrenRef.value[index].clientWidth;

      while (currentX > xDistance || index == props.items.length - 1) {
        xDistance += childrenRef.value[index].clientWidth;
        index++;
      }
      return index;
    };
    const witchItemIsEnd = () => {
      const { el } = getConfig();

      let currentX = Math.abs(+gsap.getProperty(unref(el), "x"));
      currentX += unref(el)?.clientWidth || 0;
      if (currentX == 0) {
        return 0;
      }
      let index = 0;
      let xDistance = childrenRef.value[index].clientWidth;

      while (currentX > xDistance || index == props.items.length - 1) {
        xDistance += childrenRef.value[index].clientWidth;
        index++;
      }
      return index;
    };
    const setMiddleIfIsSlider = () => {
      if (props.slider) {
        const index = witchItemIsMiddle();
        setActiveIndexMiddle(index);
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
      const currentX = gsap.getProperty(unref(el), "x");
      const plusX = unref(el)!.clientWidth;
      gsap.to(unref(el), {
        x: getValidX(unref(isRtl) ? +currentX + plusX : +currentX - plusX),
        overwrite: true,
        ...props.config,
        onComplete: onAnimationComplete,
      });
    };
    const clickPrev = () => {
      if (props.slider) {
        setActiveIndexMiddle(unref(middleItemRef.value) - 1);
        return;
      }
      const { el } = getConfig();
      const currentX = gsap.getProperty(unref(el), "x");
      const plusX = unref(el)!.clientWidth;
      gsap.to(unref(el), {
        x: getValidX(unref(isRtl) ? +currentX - plusX : +currentX + plusX),
        overwrite: true,
        ...props.config,
        onComplete: onAnimationComplete,
      });
    };
    onMounted(() => {
      gsap.registerPlugin(Draggable);
      const { el, maxX } = getConfig();
      Draggable.create(unref(el), {
        type: "x",
        edgeResistance: 0.9,
        allowContextMenu: props.allowContextMenu,
        //@ts-ignore
        bounds: { minX: 0, maxX },
        throwProps: true,
      });
      setMiddleIfIsSlider();

      useDraggableSmoother(el, {
        getValidX,
        onComplete: () => {
          setMiddleIfIsSlider();
          onAnimationComplete();
        },
      });
      useEventListener(window, "resize", recalculate);
      if (props.autoPlayInterval > 0) {
        useIntervalFn(() => {
          if (!childrenRef.value[unref(middleItemRef) + 1]) {
            middleItemRef.value = -1;
            clickNext(0.2);
          } else {
            clickNext();
          }
        }, props.autoPlayInterval);
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
    };
  },
});
</script>

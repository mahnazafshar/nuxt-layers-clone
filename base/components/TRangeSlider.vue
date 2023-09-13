<template>
  <div
    ref="container"
    data-name="container"
    :class="renderClass('min-w-48 cursor-pointer', 'container')"
    v-bind="attrsToBind"
    @click="handleClick"
  >
    <div
      data-name="innerContainer"
      :class="renderClass('relative z-10 h-2', 'innerContainer')"
    >
      <div
        data-name="pan"
        :class="
          renderClass(
            'absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200',
            'pan'
          )
        "
      />

      <div
        data-name="activePan"
        :class="[
          getVariantClass,
          renderClass('absolute z-20 top-0 bottom-0 rounded-md', 'activePan'),
        ]"
        :style="'right:' + maxThumb + '%; left:' + minThumb + '%'"
      />

      <div
        v-if="!disableMin"
        data-name="minCircle"
        :class="[
          getVariantClass,
          renderClass(
            'absolute z-30 w-6 h-6 top-0 left-0 rounded-full cursor-pointer -mt-2 -ml-3',
            'minCircle'
          ),
        ]"
        :style="'left: ' + minThumb + '%'"
        v-bind="minEvents"
      >
        <slot
          name="min-inner"
          :min-value="minValue"
        />
      </div>

      <div
        v-if="!disableMax"
        data-name="maxCircle"
        :class="[
          getVariantClass,
          renderClass(
            'absolute z-30 w-6 h-6 top-0 right-0 rounded-full cursor-pointer -mt-2 -mr-3',
            'maxCircle'
          ),
        ]"
        :style="'right: ' + maxThumb + '%'"
        v-bind="maxEvents"
      >
        <slot
          name="max-inner"
          :max-value="maxValue"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import { Variants } from "../utils/global.types";
import { useDebounceFn, useEventListener } from '@vueuse/core'

export default defineComponent({
  name: "TRangeSlider",
  inheritAttrs: false,
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 0,
    },
    disableMin: {
      type: Boolean,
      default: () => inject("t-range-slider-disableMin", false),
    },
    disableMax: {
      type: Boolean,
      default: () => inject("t-range-slider-disableMax", false),
    },

    variant: {
      type: String as PropType<Variants>,
      default: () => inject("t-range-slider-variant", "primary"),
      validator: (propValue: string) => {
        return !!Variants[propValue];
      },
    },
  },
  emits: {
    "update:minValue"(value: number) {
      return typeof value === "number";
    },
    "update:maxValue"(value: number) {
      return typeof value === "number";
    },
  },
  setup(props, { emit }) {
    const rangeSliderVariant: Record<Variants, string> = {
      primary: "bg-primary",
      success: "bg-success",
      danger: "bg-danger",
      warning: "bg-warning",
      white: "bg-white",
      secondary: "bg-secondary",
    };
    const getVariantClass = computed(() => {
      return rangeSliderVariant[props.variant] || "bg-primary";
    });

    const rangeArea = props.max - props.min;
    const container = ref<any>(null);
    const containerWidth = ref(0);

    onMounted(() => {
      if (props.minValue < props.min || props.minValue > props.max) {
        console.error("t-range-slider : minValue is out of range");
      }
      if (props.maxValue < props.min || props.maxValue > props.max) {
        console.error("t-range-slider : maxvalue is out of range");
      }
      if (props.min === props.max) {
        console.error(
          "t-range-slider : range area is invalid min and max are equal"
        );
      } else if (props.min > props.max) {
        console.error(
          "t-range-slider : range area is invalid max is bigger than min"
        );
      }
      containerWidth.value = container.value?.scrollWidth;
    });

    useEventListener('resize',
      useDebounceFn(()=>{
        containerWidth.value = container.value?.scrollWidth;
      },1000)
    )
    const { minThumb, minEvents } = useRangeMin(
      containerWidth,
      rangeArea,
      props,
      { emit }
    );
    const { maxThumb, maxEvents } = useRangeMax(
      containerWidth,
      rangeArea,
      props,
      { emit }
    );

    const { renderClass,attrsToBind } = useRenderClass("TRangeSlider");

    const handleClick = (event: { clientX: number }) => {
      const rect = container.value.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const newMinValue =
        (clickX / containerWidth.value) * rangeArea + props.min;
      const newMaxValue =
        props.max -
        ((containerWidth.value - clickX) / containerWidth.value) * rangeArea;

      if (!props.disableMin && !props.disableMax) {
        const distanceToMin = Math.abs(newMinValue - props.minValue);
        const distanceToMax = Math.abs(newMaxValue - props.maxValue);
        if (distanceToMin <= distanceToMax) {
          emit("update:minValue", newMinValue);
        } else {
          emit("update:maxValue", newMaxValue);
        }
      } else if (!props.disableMin) {
        emit("update:minValue", newMinValue);
      } else if (!props.disableMax) {
        emit("update:maxValue", newMaxValue);
      }
    };

    return {
      renderClass,
      attrsToBind,
      minThumb,
      minEvents,
      maxThumb,
      maxEvents,
      container,
      getVariantClass,
      handleClick,
    };
  },
});
</script>

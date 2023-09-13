<template>
  <template v-if="type === SkeletonTypes.AVATAR_LIST">
    <div
      data-name="avatarListContainer"
      v-bind="attrsToBind"
      :class="
        renderClass(
          `${containerClass} p-4 w-full mx-auto cursor-wait ${borderClass}  ${shadowClass} ${roundedClass}`,
          'avatarListContainer'
        )
      "
    >
      <div
        data-name="avatarListInnerContainer"
        :class="renderClass('relative overflow-hidden animate-pulse delay-500 flex space-x-reverse space-x-4', 'avatarListInnerContainer')"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
        <div
          data-name="avatarListCircle"
          :class="renderClass('rounded-full bg-gray-300 h-12 w-12', 'avatarListCircle')"
        ></div>
        <div class="flex-1 space-y-4 py-1">
          <div
            data-name="avatarListLine"
            :class="renderClass('h-4 bg-gray-300 rounded w-3/4', 'avatarListLine')"
          ></div>
          <div class="space-y-2">
            <div
              data-name="avatarListLine"
              :class="renderClass('h-4 bg-gray-300 rounded', 'avatarListLine')"
            ></div>
            <div
              data-name="avatarListLine"
              :class="renderClass('h-4 bg-gray-300 rounded w-5/6', 'avatarListLine')"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-else-if="type === SkeletonTypes.IMAGE">
    <div
      data-name="imageContainer"
      v-bind="attrsToBind"
      :class="renderClass(
        `${containerClass} ${roundedSmClass} ${shadowClass} ${borderClass} max-w-xs w-full mx-auto cursor-wait`,
        'imageContainer'
      )"
    >
      <div
        data-name="imageInnerContainer"
        :class="renderClass('relative overflow-hidden animate-pulse delay-500', 'imageInnerContainer')"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
        <div
          data-name="image"
          :class="renderClass(`w-full h-60 bg-gray-300 ${roundedSmClass}`, 'image')"
        ></div>
      </div>
    </div>
  </template>

  <template v-else-if="type === SkeletonTypes.CARD">
    <div
      data-name="cardContainer"
      v-bind="attrsToBind"
      :class="renderClass(
        `${containerClass} ${roundedSmClass} ${shadowClass} ${borderClass} max-w-xs  w-full mx-auto cursor-wait`,
        'cardContainer'
      )"
    >
      <div
        data-name="cardInnerContainer"
        :class="renderClass('relative overflow-hidden flex flex-col pb-5 animate-pulse delay-500', 'cardInnerContainer')"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
        <div
          data-name="cardImage"
          :class="renderClass(
            `${rounded ? 'rounded-t-sm' : ''} w-full h-60 bg-gray-300 mb-5`,
            'cardImage'
          )"
        ></div>
        <template v-if="$slots.footer">
          <slot name="footer"></slot>
        </template>
        <template v-else>
          <div
            data-name="cardLine"
            :class="renderClass('h-4 bg-gray-300 rounded w-1/2 mr-6', 'cardLine')"
          ></div>
        </template>
      </div>
    </div>
  </template>

  <template v-else-if="type === SkeletonTypes.ONE_LINE">
    <div
      data-name="lineContainer"
      v-bind="attrsToBind"
      :class="renderClass(
        `${containerClass} ${roundedClass} ${shadowClass} ${borderClass} p-4 w-full mx-auto cursor-wait`,
        'lineContainer'
      )"
    >
      <div
        data-name="line"
        :class="renderClass(
          `${containerClass} relative overflow-hidden delay-500 animate-pulse h-4 bg-gray-300 rounded w-full`,
          'line'
        )"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
      </div>
    </div>
  </template>
  <template v-else-if="type === SkeletonTypes.THREE_LINE">
    <div
      v-bind="attrsToBind"
      data-name="threeLineContainer"
      :class="renderClass(
        `${containerClass} ${roundedClass} ${shadowClass} ${borderClass} p-4 w-full mx-auto cursor-wait`,
        'threeLineContainer'
      )"
    >
      <div
        data-name="threeLineInnerContainer"
        :class="renderClass(
          `${containerClass} relative overflow-hidden flex-1 space-y-3 py-1 animate-pulse delay-500`,
          'threeLineInnerContainer'
        )"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
        <div
          data-name="threeLine"
          :class="renderClass('h-4 bg-gray-300 rounded w-3/4 threeLine', 'threeLine')"
        ></div>
        <div
          data-name="threeLine"
          :class="renderClass('h-4 bg-gray-300 rounded threeLine', 'threeLine')"
        ></div>
        <div
          data-name="threeLine"
          :class="renderClass('h-4 bg-gray-300 rounded w-5/6 threeLine', 'threeLine')"
        ></div>
      </div>
    </div>
  </template>
  <template v-else-if="type === SkeletonTypes.CUSTOM">
    <div
      v-bind="attrsToBind"
      data-name="customContainer"
      :class="renderClass(
        `${containerClass} ${roundedClass} ${shadowClass} ${borderClass} w-full mx-auto cursor-wait`,
        'customContainer',
      )"
    >
      <div
        data-name="custom"
        :class="renderClass('relative overflow-hidden animate-pulse delay-500', 'custom')"
      >
        <div
          class="skeleton-box absolute top-0 right-0 bottom-0 left-0 transform -translate-x-full"
        ></div>
        <slot></slot>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
  props: {
    containerClass: {
      type: [Object, String, Array],
      default: "",
    },
    type: {
      type: String as PropType<SkeletonTypes>,
      default: () => inject("t-skeleton-type", SkeletonTypes.AVATAR_LIST),
      validator: (value: SkeletonTypes) => {
        return Object.values(SkeletonTypes).includes(value);
      },
    },
    border: {
      type: Boolean,
      default: () => inject("t-skeleton-border", true),
    },
    shadow: {
      type: Boolean,
      default: () => inject("t-skeleton-shadow", true),
    },
    rounded: {
      type: Boolean,
      default: () => inject("t-skeleton-rounded", false),
    },
  },
  setup(props) {
    const { renderClass, attrsToBind } = useRenderClass("TSkeleton");

    const shadowClass = computed(() => (props.shadow ? "shadow" : ""));
    const borderClass = computed(() =>
      props.border ? "border border-gray-200" : ""
    );
    const roundedClass = computed(() => (props.rounded ? "rounded-md" : ""));
    const roundedSmClass = computed(() => (props.rounded ? "rounded-sm" : ""));
    return {
      renderClass,
      attrsToBind,
      SkeletonTypes: SkeletonTypes,
      shadowClass,
      borderClass,
      roundedClass,
      roundedSmClass,
    };
  },
});
</script>

<style>
.skeleton-box {
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0) 10%,
    rgba(255, 255, 255, 0.3) 80%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
../../utils/TSkeleton.enum

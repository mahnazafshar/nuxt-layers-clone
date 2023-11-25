<template>
  <div
    data-name="container"
    :class="
      renderClass(`flex flex-col ${wrapperClass}`, 'container', {
        'join join-vertical': isJoin,
      })
    "
    v-bind="attrsToBind"
  >
    <div v-for="(item, index) in items" :key="`accordion-${index}`">
      <div
        :value="modelValue"
        data-name="innerContainer"
        class="collapse"
        :class="[
          renderClass(`collapse ${containerClass}`, 'innerContainer', {
            'collapse-arrow': hasArrow,
            'collapse-plus': hasPlus,
            'collapse-open': forceOpen,
            'collapse-close': forceClose,
            'join-item': isJoin,
          }),
        ]"
      >
        <input
          type="radio"
          :checked="selectedIndex === index"
          :name="name"
          data-name="radioButton"
          :class="renderClass('peer', 'radioButton')"
          @click="clickToggle(index)"
        />
        <div
          data-name="title"
          :class="renderClass(`collapse-title ${titleClass}`, 'title')"
          class=""
        >
          <slot
            name="title"
            :title="item.title"
            :isOpen="selectedIndex === index"
            :index="index"
          >
            {{ item.title }}
          </slot>
        </div>
        <div
          data-name="content"
          :class="renderClass(`collapse-content ${contentClass}`, 'content')"
        >
          <slot
            name="content"
            :content="item.content"
            :isOpen="selectedIndex === index"
            :index="index"
          >
            {{ item.content }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const { renderClass, attrsToBind } = useRenderClass("DAccordion");

const emit = defineEmits(["update:modelValue"]);

interface Props {
  items?: any[];
  name: string;
  title?: string;
  content?: string;
  hasArrow?: boolean;
  hasPlus?: boolean;
  forceOpen?: boolean;
  forceClose?: boolean;
  modelValue?: number;
  titleClass?: string;
  contentClass?: string;
  containerClass?: string;
  wrapperClass?: string;
  isJoin?: boolean;
  toggleWithHeader?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  hasArrow: false,
  hasPlus: false,
  forceOpen: false,
  forceClose: false,
  isJoin: false,
  toggleWithHeader: true,
});
const selectedIndex = ref(props.modelValue);

function clickToggle(index: number) {
  if (index === unref(selectedIndex) && props.toggleWithHeader) {
    selectedIndex.value = undefined;
  } else {
    selectedIndex.value = index;
  }
}
watch(selectedIndex, (value) => {
  emit("update:modelValue", value);
});
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue !== unref(selectedIndex)) {
      selectedIndex.value = props.modelValue;
    }
  }
);
</script>
<style scoped>
[dir="rtl"]
  .collapse-arrow:not(.collapse-close)
  input[type="radio"]:checked
  ~ .collapse-title:after {
  --tw-translate-y: -50%;
  --tw-rotate: 134deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
</style>

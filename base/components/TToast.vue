<template>
  <div
    ref="target"
    data-name="message"
    :class="
      renderClass(
        `bg-${toastRef.type} text-white invisible fixed bottom-0 right-1/2 transform translate-x-1/2 p-3 rounded-md`,
        'message'
      )
    "
    v-bind="attrsToBind"
  >
    <slot name="default" :message="toastRef.message" :type="toastRef.type">
      {{ toastRef.message }}
    </slot>
  </div>
</template>

<script setup lang="ts">
//bg-primary bg-warning bg-error
import gsap from "gsap";
const props = withDefaults(defineProps<{ key: string }>({ key: "--toast--" }));
defineOptions({
  inheritAttrs: false,
});
const { renderClass, attrsToBind } = useRenderClass("TToast");
const { toastRef } = useToast(props.key);
const target = ref<HTMLElement | null>(null);
let animation: any;
const setAnimation = (): void => {
  animation = gsap.to(unref(target), {
    autoAlpha: 1,
    bottom: 80,
    ease: "power4",
    paused: true,
    duration: 0.5,
  });
};
onMounted(() => {
  setAnimation();
});
onMounted(() => {
  if (unref(toastRef).show) {
    animation.play();
  }
});
watch(toastRef, (value) => {
  if (value.show) {
    animation.play();
  } else {
    animation.reverse();
  }
});
</script>

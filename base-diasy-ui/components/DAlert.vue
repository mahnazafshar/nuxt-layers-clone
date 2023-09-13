<template>
  <div
    data-name="container"
    :class="renderClass(`alert ${getAlertClass}`, 'container')"
    v-bind="attrsToBind"
  >
    <div
      data-name="icon"
      :class="renderClass('', 'icon')"
      v-html="alertIcon"
    />
    <span
      data-name="text"
      :class="renderClass('', 'text')"
    >
      <slot name="text">{{ text }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">

defineOptions({
    inheritAttrs: false,
})

const { renderClass, attrsToBind } = useRenderClass("DAlert");

interface Props {
  variant?: DAlertTypes;
  text?: string;
}
const alertVariant = {
  [DAlertTypes.default]: "alert",
  [DAlertTypes.info]: "alert-info",
  [DAlertTypes.success]: "alert-success",
  [DAlertTypes.warning]: "alert-warning",
  [DAlertTypes.error]: "alert-error",
};
const getAlertClass = computed(() => {
  return alertVariant[props.variant] || "alert-success";
});
const props = defineProps<Props>();
const alertIcon = computed(() => {
  if (props.variant === DAlertTypes.info) {
    return `<div data-test="info-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`;
  } else if (props.variant === DAlertTypes.success) {
    return `<div data-test="success-icon"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>`;
  } else if (props.variant === DAlertTypes.warning) {
    return `<div data-test="warning-icon"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>`;
  } else if (props.variant === DAlertTypes.error) {
    return `<div data-test="error-icon"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>`;
  } else {
    return `<div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>`;
  }
});
</script>

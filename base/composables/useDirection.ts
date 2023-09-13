import { inject, computed } from "vue";
export const useDirection = () => {
  const TSettings = inject<TSettings>("TSettings");
  const isRtl = computed(
    () => TSettings?.direction == "rtl" || TSettings?.direction == undefined
  );
  const isLtr = computed(() => TSettings?.direction == "ltr");

  const ltrModel = ref(false);
  const dir = computed(() => {
    return unref(ltrModel) ? "ltr" : "rtl";
  });
  useHead({
    htmlAttrs: {
      dir: dir,
    },
  });

  return { isRtl, isLtr, ltrModel, dir };
};

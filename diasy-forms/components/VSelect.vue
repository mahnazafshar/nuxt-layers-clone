<template>
  <div
    data-name="container"
    :class="renderClass('form-control', 'container', { 'has-error': !!errorMessage, success: meta.valid })"
    v-bind="attrsToBind"
  >
    <label
      v-if="label !== ''"
      data-name="labelContainer"
      :class="renderClass('t-row justify-between pb-1.5 px-1', 'labelContainer')"
      :for="name"
    >
      <span
        data-name="label"
        :class="renderClass('label-text', 'label')"
      >
        {{ label }}
      </span>
      <slot name="leftLabel" />
    </label>
    <select
      data-name="select"
      :class="renderClass(`select select-bordered w-full max-w-xs ${getColorClass} ${getSizeClass}`, 'select')"
      :disabled="disabled"
      type="select"
      @change="handleChange"
    >
      <option
        v-if="placeholder"
        data-name="placeholder"
        :class="renderClass('', 'placeholder')"
        disabled
        selected
      >
        {{ placeholder }}
      </option>
      <option
        v-for="(item, index) in getItems"
        :key="index"
        :value="item.value"
        :disabled="item.disabled"
        :selected="item.value==inputValue"
        data-name="option"
        :class="renderClass('', 'option')"
      >
        {{ item.label }}
      </option>
    </select>

    <label
      data-name="messageLabel"
      :class="renderClass('flex items-center min-h-[1.4rem] px-1', 'messageLabel')"
    >
      <span
        data-name="messageSpan"
        :class="renderClass('label-text-alt text-error text-2xs leading-3', 'messageSpan')"
      >
        {{ errorMessage || successMessage }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { VSelectColor, VSelectSize } from "../utils/global.types";

export default {
  name: "VSelect",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: () => inject("v-select-label", "")
    },
    successMessage: {
      type: String,
      default: () => inject("v-select-success-msg", ""),
    },
    placeholder: {
      type: String,
      default: () => inject("v-select-placeholder", ""),
    },
    items: {
      type: Array as PropType<(string[] | number[] | Record<string | number, string | number>[])>,
      default: () => [],
    },
    labelField: {
      type: String,
      default: () => inject("v-select-label-field", "label"),
    },
    valueField: {
      type: String,
      default: () => inject("v-select-value-field", "value"),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: () => inject("v-select-color", VSelectColor.primary),
    },
    size: {
      type: String,
      default: () => inject("v-select-size", VSelectSize.md),
    },
  },
  setup(props: any, { emit }) {
    const { renderClass, attrsToBind } = useRenderClass("VSelect");

    const { items } = toRefs(props)
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
      setValue,
    } = useField(toRef(props.name), undefined, {
      ...(props.modelValue != undefined
      ? { initialValue: props.modelValue }
      : {}),
      validateOnValueUpdate: false,
    });
    watchEffect(() => {
      emit("update:modelValue", unref(inputValue));
    });
    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );

    const getItems = computed(() => {
      if (!items.value || items.value.length === 0) return [];

      return items.value.map((item: any) => {
        if (typeof item === 'string' || typeof item === 'number') {
          return {
            label: item,
            value: item,
          };
        } else {
          return {
            label: item[props.labelField],
            value: item[props.valueField],
            disabled: item?.disabled,
          };
        }
      });
    });

    const selectColor = {
      [VSelectColor.primary]: "select-primary",
      [VSelectColor.secondary]: "select-secondary",
      [VSelectColor.accent]: "select-accent",
      [VSelectColor.success]: "select-success",
      [VSelectColor.warning]: "select-warning",
      [VSelectColor.info]: "select-info",
      [VSelectColor.error]: "select-error",
    };

    const getColorClass = computed(() => {
      return selectColor[props.color];
    });

    const selectSize = {
      [VSelectSize.lg]: "select-lg",
      [VSelectSize.md]: "select-md",
      [VSelectSize.sm]: "select-sm",
      [VSelectSize.xs]: "select-xs",
    };
    const getSizeClass = computed(() => selectSize[props.size]);

    return {
      renderClass,
      attrsToBind,
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
      getItems,
      getColorClass,
      getSizeClass
    };
  },
};
</script>
<style scoped>
[dir="rtl"] .select {
    background-position: calc(100% - (90% + 12px)) calc(1px + 50%), calc(100% - (90% + 16px)) calc(1px + 50%);
}
</style>

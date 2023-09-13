<template>
  <div
    data-name="container"
    :class="
      renderClass('form-control', 'container', {
        'has-error': !!errorMessage,
        success: meta.valid,
      })
    "
    v-bind="attrsToBind"
  >
    <label
      data-name="labelContainer"
      :class="renderClass('t-row pb-1.5 px-1 cursor-pointer', 'labelContainer')"
    >
      <input
        data-name="input"
        :class="
          renderClass(
            `radio input-bordered ml-2 ${getColorClass} ${getSizeClass}`,
            'input'
          )
        "
        v-bind="$attrs"
        type="radio"
        :name="name"
        :disabled="disabled"
        :checked="checked"
        @change="handleChange"
      />
      <slot name="label" :checked="checked" :disabled="disabled">
        <span data-name="label" :class="renderClass('label-text', 'label')">{{
          label
        }}</span>
      </slot>
      <slot name="leftLabel" />
    </label>

    <label
      data-name="messageLabel"
      :class="
        renderClass('flex items-center min-h-[1.4rem] px-1', 'messageLabel')
      "
    >
      <span
        data-name="messageSpan"
        :class="
          renderClass(
            'label-text-alt text-error text-2xs leading-3',
            'messageSpan'
          )
        "
      >
        {{ errorMessage || successMessage }}</span
      >
    </label>
  </div>
</template>

<script lang="ts">
import { useField, Field } from "vee-validate";
export default {
  name: "VRadio",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean],
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    successMessage: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Boolean, Number],
      default: true,
    },
    useModelValue: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: VRadioColor.primary,
    },
    size: {
      type: String,
      default: VRadioSize.md,
    },
  },
  setup(props: any, { emit }) {
    const { renderClass, attrsToBind } = useRenderClass("VRadio");

    const {
      checked,
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
      setValue,
    } = useField(toRef(props.name), undefined, {
      type: "radio",
      checkedValue: props.value,
      validateOnValueUpdate: false,
      ...(props.useModelValue ? { initialValue: props.modelValue } : {}),
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

    // **********************
    const checkboxColor = {
      [VRadioColor.primary]: "radio-primary",
      [VRadioColor.secondary]: "radio-secondary",
      [VRadioColor.accent]: "radio-accent",
      [VRadioColor.success]: "radio-success",
      [VRadioColor.warning]: "radio-warning",
      [VRadioColor.info]: "radio-info",
      [VRadioColor.error]: "radio-error",
    };

    const getColorClass = computed(() => {
      return checkboxColor[props.color];
    });

    // **********************

    const checkboxSize = {
      [VRadioSize.lg]: "radio-lg",
      [VRadioSize.md]: "radio-md",
      [VRadioSize.sm]: "radio-sm",
      [VRadioSize.xs]: "radio-xs",
    };
    const getSizeClass = computed(() => checkboxSize[props.size]);

    return {
      renderClass,
      attrsToBind,
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
      checked,
      getColorClass,
      getSizeClass,
    };
  },
};
</script>
<style></style>

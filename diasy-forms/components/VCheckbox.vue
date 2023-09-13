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
        v-bind="$attrs"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :checked="checked"
        :class="
          renderClass(
            `${
              toggle
                ? `toggle ${getToggleColorClass} ${getToggleSizeClass}`
                : `checkbox  input-bordered  ml-2 ${getSizeClass} ${getColorClass} `
            }  `,
            'input'
          )
        "
        @change="handleChange"
      />
      <slot name="label" :checked="checked" :disabled="disabled">
        <span class="label-text">{{ label }}</span>
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
  name: "VCheckbox",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array],
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: () => inject("v-checkbox-label", ""),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    successMessage: {
      type: String,
      default: () => inject("v-checkbox-success-msg", ""),
    },
    checkedValue: {
      type: [String, Boolean, Number],
      default: () => inject("v-checkbox-checked-value", true),
    },
    uncheckedValue: {
      type: [String, Boolean, Number],
      default: () => inject("v-checkbox-un-checked-value", false),
    },
    useModelValue: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: () => inject("v-checkbox-color", VCheckboxColor.primary),
    },
    size: {
      type: String,
      default: () => inject("v-checkbox-size", VCheckboxSize.md),
    },
    toggle: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: any, { emit }) {
    const { renderClass, attrsToBind } = useRenderClass(
      props.toggle ? "VToggle" : "VCheckbox"
    );

    const {
      checked,
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
      setValue,
    } = useField(toRef(props.name), undefined, {
      type: "checkbox",
      checkedValue: props.checkedValue,
      uncheckedValue: props.uncheckedValue,
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
      [VCheckboxColor.primary]: "checkbox-primary",
      [VCheckboxColor.secondary]: "checkbox-secondary",
      [VCheckboxColor.accent]: "checkbox-accent",
      [VCheckboxColor.success]: "checkbox-success",
      [VCheckboxColor.warning]: "checkbox-warning",
      [VCheckboxColor.info]: "checkbox-info",
      [VCheckboxColor.error]: "checkbox-error",
    };

    const getColorClass = computed(() => {
      return checkboxColor[props.color];
    });

    // **********************

    const checkboxSize = {
      [VCheckboxSize.lg]: "checkbox-lg",
      [VCheckboxSize.md]: "checkbox-md",
      [VCheckboxSize.sm]: "checkbox-sm",
      [VCheckboxSize.xs]: "checkbox-xs",
    };
    const getSizeClass = computed(() => checkboxSize[props.size]);

    // *********************
    const toggleColor = {
      [VCheckboxColor.primary]: "toggle-primary",
      [VCheckboxColor.secondary]: "toggle-secondary",
      [VCheckboxColor.accent]: "toggle-accent",
      [VCheckboxColor.success]: "toggle-success",
      [VCheckboxColor.warning]: "toggle-warning",
      [VCheckboxColor.info]: "toggle-info",
      [VCheckboxColor.error]: "toggle-error",
    };

    const getToggleColorClass = computed(() => {
      return toggleColor[props.color];
    });

    // **********************
    const toggleSize = {
      [VCheckboxSize.lg]: "toggle-lg",
      [VCheckboxSize.md]: "toggle-md",
      [VCheckboxSize.sm]: "toggle-sm",
      [VCheckboxSize.xs]: "toggle-xs",
    };
    const getToggleSizeClass = computed(() => toggleSize[props.size]);

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
      getToggleColorClass,
      getToggleSizeClass,
    };
  },
};
</script>
<style></style>

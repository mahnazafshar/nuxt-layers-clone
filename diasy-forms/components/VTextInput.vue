<template>
  <div
    data-name="container"
    :class="
      renderClass('form-control', 'container', {
        'has-error': !!errorMessage,
        'input-disabled': $attrs.disabled,
        success: meta.valid,
      })
    "
    v-bind="attrsToBind"
  >
    <label
      v-if="label !== ''"
      data-name="labelContainer"
      :class="
        renderClass('t-row justify-between pb-1.5 px-1', 'labelContainer')
      "
      :for="name"
    >
      <span data-name="label" :class="renderClass('label-text', 'label')">{{
        label
      }}</span>
      <slot name="leftLabel" />
    </label>

    <template v-if="area">
      <textarea
        data-name="input"
        :class="renderClass('input input-bordered h-32', 'input')"
        v-bind="$attrs"
        :name="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="customHandleChange"
        @blur="handleBlur"
      />
    </template>
    <template v-else>
      <input
        ref="inputRef"
        data-name="input"
        :class="renderClass('input input-bordered', 'input')"
        autocomplete="off"
        v-bind="$attrs"
        :name="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="customHandleChange"
        @blur="handleBlur"
      />
    </template>

    <slot name="messageLabel">
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
    </slot>
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
import { latinNumber } from "../../global-composables/utils/LatinNumbers";
export default {
  name: "VTextInput",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "text",
    },
    area: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: () => inject("v-input-text-label", ""),
    },
    successMessage: {
      type: String,
      default: () => inject("v-input-text-success-msg", ""),
    },
    placeholder: {
      type: String,
      default: () => inject("v-input-text-placeholder", ""),
    },
    focus: {
      type: Boolean,
      default: false,
    },
    select: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: any, { emit, attrs }) {
    const { renderClass, attrsToBind } = useRenderClass(
      props.area ? "VTextarea" : "VTextInput"
    );

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

    const customHandleChange = (event) => {
      // console.log("onchange", attrs, props.type);
      if (attrs?.inputmode == "numeric") {
        event.target.value = latinNumber(event?.target?.value);
      }
      handleChange(event);
    };
    watchEffect(() => {
      emit("update:modelValue", unref(inputValue));
    });
    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );

    const inputRef = ref();
    onMounted(() => {
      if (props.select) {
        inputRef.value.select();
      }
      if (props.focus) {
        inputRef.value.focus();
      }
    });

    return {
      renderClass,
      attrsToBind,
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
      inputRef,
      customHandleChange,
    };
  },
};
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>

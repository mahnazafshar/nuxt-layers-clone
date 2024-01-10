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
    <input
      ref="inputRef"
      inputmode="numeric"
      data-name="input"
      autocomplete="off"
      v-bind="$attrs"
      :placeholder="placeholder"
      :class="renderClass('input input-bordered', 'input')"
    />
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

<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useCurrencyInput } from "vue-currency-input";
import type { CurrencyInputOptions } from "vue-currency-input";
import { useField } from "vee-validate";

const props = withDefaults(
  defineProps<{
    name: string;
    options?: CurrencyInputOptions;
    modelValue?: number;
    focus?: boolean;
    label?: string;
    placeholder?: string;
    successMessage?: string;
  }>(),
  {
    options: () => {
      return inject("v-currency-input-options", {
        currency: "USD",
        locale: "en",
        currencyDisplay: "hidden",
      });
    },
  }
);
const emit = defineEmits(["update:modelValue"]);
const { renderClass, attrsToBind } = useRenderClass("VCurrencyInput");
const { formattedValue, numberValue, inputRef, setValue } = useCurrencyInput(
  props.options
);
const {
  errorMessage,
  handleChange,
  value: inputValue,
  meta,
} = useField(toRef(props.name), undefined, {
  ...(props.modelValue != undefined ? { initialValue: props.modelValue } : {}),
  validateOnValueUpdate: false,
});
watchEffect(() => {
  emit("update:modelValue", unref(inputValue));
});
onMounted(() => {
  // Currently there is a bug where you have to wait until after mount for useCurrencyInput to properly set the value
  setTimeout(() => {
    // sets the initial value if provided
    if (inputValue.value) {
      setValue(inputValue.value);
    }
    if (props.focus) {
      inputRef.value.focus();
    }
  }, 300);
});

// We can track the formatted value ourselves and sync it with vee-validate as a number when possible
watch(numberValue, (newValue) => {
  // sync it with vee-validate, this will trigger validation
  handleChange(newValue);
});
</script>

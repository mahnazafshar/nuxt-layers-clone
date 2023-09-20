<template>
  <div class="flex flex-col">
    <div
      data-name="container"
      :class="
        renderClass(
          'flex flex-row-reverse justify-end space-x-2 xs:space-x-2 sm:space-x-4',
          'container'
        )
      "
      class=""
    >
      <input
        v-for="(item, index) in length"
        data-name="input"
        v-model="code[index]"
        :key="index"
        :class="
          renderClass('w-12 h-12 p-0 text-center input input-bordered', 'input')
        "
        type="number"
        inputmode="numeric"
        maxlength="1"
        align="center"
        placeholder="-"
        :ref="(el) => setChildrenRef(el, index)"
        @click="activityIndex = index"
        @keyup.enter="enterKey"
        @keyup.backspace="clear(index)"
        @input="changeActiveFocus($event, index)"
      />
    </div>
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
        {{ errorMessage }}</span
      >
    </label>
  </div>
</template>
<script lang="ts">
import { useField } from "vee-validate";
export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: false,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    length: {
      type: Number,
      default: 4,
    },
  },
  setup(props, { emit }) {
    const { renderClass, attrsToBind } = useRenderClass(
      "VVerificationCodeInput"
    );
    const code = ref<number[]>([]);
    const activityIndex = ref(0);

    // ******************************
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
    // *********************************************

    const childrenRef = ref<HTMLInputElement[]>(
      [] as unknown as HTMLInputElement[]
    );
    const setChildrenRef = (el: HTMLInputElement, index: number) => {
      if (el) childrenRef.value[index] = el;
    };

    function changeActiveFocus(e: InputEvent, index: number) {
      if (e.data) {
        activityIndex.value = index + 1;
        childrenRef.value[index].value = e.data;
      } else {
        activityIndex.value = index - 1;
      }
      if (code.value[index]?.toString()?.length > 1) {
        code.value[index] = parseInt(e.data);
      }
      console.log("after", childrenRef.value[index].value);
      console.log("code is ", unref(code));
      if (unref(activityIndex) <= props.length - 1) {
        childrenRef.value[unref(activityIndex)].focus();
        childrenRef.value[unref(activityIndex)].select();
      }
    }
    function enterKey() {
      if (unref(code).join("").length === props.length) {
        emit("submit");
      }
    }

    watch(
      () => unref(code),
      (value) => {
        if (value.join("").length == props.length) {
          setValue(value.join(""));
        } else if (value.join("").length < props.length && unref(inputValue)) {
          setValue("");
        }
      },
      { deep: true }
    );

    function clear(index: number) {
      activityIndex.value = index - 1;
    }

    return {
      code,
      changeActiveFocus,
      activityIndex,
      enterKey,
      clear,
      setChildrenRef,
      childrenRef,
      renderClass,
      attrsToBind,
      errorMessage,
    };
  },
};
</script>

<template>
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
</template>
<script lang="ts">
export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
  props: {
    modelValue: {
      type: [String, Number],
      required: false,
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
    const code = ref([]);
    const activityIndex = ref(0);

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
      }
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
        emit("update:modelValue", value.join(""));
      },
      { deep: true }
    );

    function clear(index) {
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
    };
  },
});
</script>

<template>
  <dialog
    ref="dialogRef"
    data-name="dialog"
    :class="renderClass(`modal ${responsiveClass}`, 'dialog')"
    v-bind="attrsToBind"
  >
    <form
      method="dialog"
      data-name="form"
      :class="renderClass('modal-box', 'form')"
    >
      <template v-if="showContent">
        <div
          data-name="headerWrapper"
          :class="renderClass('', 'headerWrapper')"
        >
          <button
            v-if="closeButton"
            data-name="closeButton"
            :class="
              renderClass(
                'btn btn-sm btn-circle btn-ghost absolute right-2 top-2',
                'closeButton'
              )
            "
          >
            <div v-html="closeIcon"></div>
          </button>
          <h3
            v-if="title"
            data-name="title"
            :class="renderClass('font-bold text-lg', 'title')"
          >
            {{ title }}
          </h3>
        </div>

        <slot />
      </template>
    </form>
    <form
      v-if="backdropClose"
      method="dialog"
      class="modal-backdrop"
      data-name="backdropForm"
      :class="renderClass('modal-backdrop', 'backdropForm')"
    >
      <button
        data-name="backdropCloseButton"
        :class="renderClass('', 'backdropCloseButton')"
      >
        close
      </button>
    </form>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from "vue";
import { useEventListener } from "@vueuse/core";
export default defineComponent({
  name: "AppModal",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean, Number],
      default: false,
    },
    closeIcon: {
      type: String,
      default: () => inject("d-modal-close-icon", "✕"),
    },
    title: {
      type: String,
      default: "",
    },
    eager: {
      type: Boolean,
      default: false,
    },
    shallowEager: {
      type: Boolean,
      default: false,
    },
    responsiveClass: {
      type: [String, Array],
      default: () =>
        inject("d-modal-responsive-class", "modal-bottom sm:modal-middle"),
    },
    backdropClose: {
      type: Boolean,
      default: true,
    },
    closeButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { renderClass, attrsToBind } = useRenderClass("DModal");
    const dialogRef = ref<HTMLDialogElement>();
    let openedOnce = false;
    const showModal = () => {
      openedOnce = true;
      dialogRef.value?.showModal();
    };
    const closeModal = () => {
      dialogRef.value?.close();
    };
    watch(
      () => props.modelValue,
      (value) => {
        if (value) {
          showModal();
        } else {
          closeModal();
        }
      }
    );
    onMounted(() => {
      useEventListener(dialogRef.value, "close", () => {
        emit("update:modelValue", false);
      });
      if (props.modelValue) {
        showModal();
      }
    });

    const showContent = computed(
      () =>
        props.eager || props.modelValue || (props.shallowEager && openedOnce)
    );

    return { dialogRef, renderClass, attrsToBind, showContent };
  },
});
</script>

<style scoped></style>

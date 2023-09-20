<template>
  <VField
    v-slot="{handleBlur, handleChange, errorMessage}"
    :name="name"
    :class="wrapperClass"
  >
    <label
      data-name="label"
      :class="renderClass(`block relative overflow-hidden rounded border border-4 h-24 border-dotted flex-1 `,'label')"
      v-bind="attrsToBind"
    >
      <input
        :id="id"
        data-name="input"
        type="file"
        :accept="accept"
        :class="renderClass('hidden', 'input')"
        @blur="handleBlur"
        @change="($event)=>{handleChange($event);handleInput($event)}"
      >
      <span
        v-if="!hasAnyFile"
        data-name="text"
        :class="renderClass('absolute inset-0 pointer-events-none t-center', 'text')"
      >
        <slot name="selectFile">
          <span class="text-center block">
            {{ $t('drop file here') }}
          </span>
        </slot>
      </span>
      <div
        v-else
        class="relative"
      >
        <slot
          name="preview"
          :src="getImageUrl"
        >
          <img
            :src="getImageUrl"
            alt=""
          >
        </slot>
        <div
          v-if="fileName"
          class="tw-flex absolute top-0 left-0 tw-cursor-pointer"
          @click.stop.prevent="onDelete"
        >
          <slot name="deleteFile">
            <button class="btn btn-sm btn-circle btn-error text-white">✕</button>
          </slot>
        </div>
      </div>
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
        {{ errorMessage || successMessage }}</span>
    </label>
  </VField>
</template>
<script setup lang="ts">

interface Props{
  modelValue?: string,
  name: string,
  id?: string,
  accept?: string,
  multiple?: boolean,
  wrapperClass?: string,
  successMessage?: string,
}
const props = withDefaults(defineProps<Props>(), {
  id: "drag",
  accept: "image/*",
  multiple: false,
  wrapperClass: '',
  successMessage: () => inject("v-file-input-draggable-text-success-msg", ""),
});

const imageUrl = ref<Blob | MediaSource>()
const files = ref([])
const fileName = ref('')
const emit=defineEmits(['update:modelValue', 'input'])
const hasAnyFile = computed(()=>unref(files).length>0)

const handleInput = ($e: any) => {
  emit(
    "update:modelValue",
    props.multiple ? $e.target.files : $e.target.files[0]
  );
  files.value = Array.from($e.target.files)
  fileName.value =  $e.target.files[0].name
};

watch(files, (newFiles) => {
  emit('input', newFiles)
  imageUrl.value = newFiles[0]
})

const getImageUrl = computed(() => {
  return imageUrl.value ? window.URL.createObjectURL(imageUrl.value) : ''
})

const onDelete = () => {
  files.value = []
  fileName.value = ''
}

const { renderClass, attrsToBind } = useRenderClass('VFileInputDraggable');
</script>

<template>
  <VField
    v-slot="{ handleBlur, handleChange, errorMessage }"
    :name="name"
    :class="wrapperClass"
  >
    <label
      data-name="label"
      :class="
        renderClass(
          `block relative p-4 rounded border border-4 h-24 border-dashed flex-1 `,
          'label'
        )
      "
      v-bind="attrsToBind"
    >
      <input
        data-name="input"
        type="file"
        :accept="accept"
        :class="renderClass('hidden', 'input')"
        @blur="handleBlur"
        @change="
          ($event) => {
            handleChange($event);
            handleInput($event);
          }
        "
        :multiple="multiple"
      />
      <span
        v-if="!hasAnyFile"
        data-name="text"
        :class="
          renderClass(
            'absolute inset-0 pointer-events-none flex justify-center items-center',
            'text'
          )
        "
      >
        <slot name="selectFile">
          <span class="text-center block">
            {{ title }}
          </span>
        </slot>
      </span>
      <div v-else class="relative h-full overflow-hidden rounded-md">
        <slot name="preview" :files="files" :src="getImageUrl">
          <div class="h-full flex justify-center items-center">
            <img :src="getImageUrl" alt="" />
          </div>
        </slot>
        <template v-if="fileName">
          <template v-if="deleteIcon">
            <component @click.stop.prevent="onDelete" :is="deleteIcon" />
          </template>
          <div
            v-else
            data-name="delete"
            :class="
              renderClass(
                'tw-flex absolute top-2 left-2 tw-cursor-pointer',
                'delete'
              )
            "
            @click.stop.prevent="onDelete"
          >
            <slot name="deleteFile">
              <button
                data-name="delete"
                :class="
                  renderClass(
                    'btn btn-sm btn-circle btn-error text-white',
                    'delete'
                  )
                "
              >
                ✕
              </button>
            </slot>
          </div>
        </template>
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
        {{ errorMessage || successMessage }}</span
      >
    </label>
  </VField>
</template>
<script setup lang="ts">
interface Props {
  modelValue?: string;
  name: string;
  accept?: string;
  multiple?: boolean;
  wrapperClass?: string;
  successMessage?: string;
  title?: string;
  deleteIcon?: any;
}
const props = withDefaults(defineProps<Props>(), {
  accept: "image/*",
  multiple: false,
  wrapperClass: "",
  successMessage: () => inject("v-file-input-draggable-text-success-msg", ""),
  title: "فایل را اینجا رها کنید...",
});
const deleteIcon = inject("v-file-input-draggable-delete-icon");
const imageUrl = ref<Blob | MediaSource>();
const files = ref([]);
const fileName = ref("");
const emit = defineEmits(["update:modelValue", "input"]);
const hasAnyFile = computed(() => unref(files).length > 0);

const handleInput = ($e: any) => {
  emit(
    "update:modelValue",
    props.multiple ? $e.target.files : $e.target.files[0]
  );
  files.value = Array.from($e.target.files) || [];
  fileName.value = files.value[0]?.name || "";
};

watch(files, (newFiles) => {
  emit("input", newFiles);
  imageUrl.value = newFiles[0];
});

const getImageUrl = computed(() => {
  return imageUrl.value ? window.URL.createObjectURL(imageUrl.value) : "";
});

const onDelete = () => {
  files.value = [];
  fileName.value = "";
};

const { renderClass, attrsToBind } = useRenderClass("VFileInputDraggable");
</script>

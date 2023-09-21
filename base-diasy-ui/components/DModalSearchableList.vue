<template>
  <d-modal v-model="dialogModel" title="">
    <v-search-select :data="data"></v-search-select>
  </d-modal>
</template>

<script lang="ts" setup>
interface Props {
  data: any[];
  searchKeys: string[];
}

const props = defineProps<Props>();
const { model: dialogModel } = useUiState("province-city-dialog");
</script>

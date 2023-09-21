<template>
  <div>
    <v-text-input v-model="input" name="search"></v-text-input>
    <div class="flex flex-col">
      <div v-for="(item, index) in result" :key="`index-${index}`">{item}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useFuse } from "@vueuse/integrations/useFuse";
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const input = ref<string>("");
    const result = useFuse(input, props.data);
    return { result };
  },
};
</script>

<template>
  <div>
    <v-text-input v-model="input" name="search"></v-text-input>
    <div class="flex flex-col">
      <template v-if="results.length > 0">
        <div
          v-for="result in results"
          :key="result.item.firstName + result.item.lastName"
        >
          <div class="flex flex-col">
            <span>
              {{ result.item.firstName }} {{ result.item.lastName }}
            </span>
            <span text-sm opacity-50> Score Index: {{ result.refIndex }} </span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="text-center pt-8 pb-4 opacity-80">No Results Found</div>
      </template>
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
    const filterBy = ref("both");
    const keys = computed(() => {
      if (filterBy.value === "first") return ["firstName"];
      else if (filterBy.value === "last") return ["lastName"];
      else return ["firstName", "lastName"];
    });

    const exactMatch = ref(false);
    const isCaseSensitive = ref(false);
    const matchAllWhenSearchEmpty = ref(true);

    const options = computed<UseFuseOptions<DataItem>>(() => ({
      fuseOptions: {
        keys: keys.value,
        // isCaseSensitive: isCaseSensitive.value,
        threshold: exactMatch.value ? 0 : undefined,
      },
      // resultLimit: resultLimit.value,
      matchAllWhenSearchEmpty: matchAllWhenSearchEmpty.value,
    }));

    const { results } = useFuse(input, props.data, options);
    return { results, input };
  },
};
</script>

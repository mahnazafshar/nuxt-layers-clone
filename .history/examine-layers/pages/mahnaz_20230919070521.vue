<template>
  <div class="p-5 flex flex-col">
  text input:
    <v-text-input v-model="name" :select="false" :focus="true"       type="number"
      inputmode="numeric"></v-text-input>
    verification code input :{{ code }}
 
    <v-verification-code-input v-model="code" :length="4" data-input-delete="h-12 w-12" data-input-add="h-14 w-14"></v-verification-code-input>

    <!-- <test-pagination></test-pagination>
    test Daisy-Forms
    <hr />
    <TestForm></TestForm>

    <hr />
    <TestDCollapse></TestDCollapse>

    <hr />
    <div class="p-3 flex flex-col gap-4">
      <TestDAccordion></TestDAccordion>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const name = ref("");
const code = ref("");
</script>

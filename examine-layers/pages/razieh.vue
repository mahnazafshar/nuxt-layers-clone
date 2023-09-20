<template>
  <div>
    <!-- <t-table :items="tableItems" :fields="TableFields">
      <template #card-header="{ data }">{{ data }}</template>
    </t-table>
    <test-d-rating></test-d-rating>
    <test-t-range-slider></test-t-range-slider>
    <test-d-dropdown></test-d-dropdown>
    <test-alert></test-alert>

    <test-v-select></test-v-select> -->
    <test-v-file-input-draggable></test-v-file-input-draggable>
  </div>
</template>

<script setup lang="ts">
const tableItems = [
  { id: 1, title: "firstItem" },
  { id: 2, title: "secondItem" },
  { id: 3, title: "thirdItem" },
  { id: 4, title: "forthItem" },
  { id: 5, title: "fifthItem" },
  { id: 6, title: "sixthItem" },
];
const TableFields = [
  { key: "title", label: "عنوان", sortable: true },
  {key:"id", label:"شناسه"}
  ];
</script>

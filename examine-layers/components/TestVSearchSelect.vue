<template>
  <!-- <v-search-select :data="data" :search-keys="['lastName']">
    <template #item="{item,index}">
      <span>{{ item.name }}-{{ item.lastName }}</span>
    </template>
  </v-search-select> -->
  <d-modal-searchable-list :data="data"></d-modal-searchable-list>
</template>
<script lang="ts" setup>
interface DataItem {
  name: string;
  lastName: string;
}

const data = ref<DataItem[]>([
  {
    name: "Roslyn",
    lastName: "Mitchell",
  },
  {
    name: "Cathleen",
    lastName: "Matthews",
  },
  {
    name: "Carleton",
    lastName: "Harrelson",
  },
  {
    name: "Allen",
    lastName: "Moores",
  },
  {
    name: "John",
    lastName: "Washington",
  },
  {
    name: "Brooke",
    lastName: "Colton",
  },
  {
    name: "Mary",
    lastName: "Rennold",
  },
  {
    name: "Nanny",
    lastName: "Field",
  },
  {
    name: "Chasity",
    lastName: "Michael",
  },
  {
    name: "Oakley",
    lastName: "Giles",
  },
  {
    name: "Johanna",
    lastName: "Shepherd",
  },
  {
    name: "Maybelle",
    lastName: "Wilkie",
  },
  {
    name: "Dawson",
    lastName: "Rowntree",
  },
  {
    name: "Manley",
    lastName: "Pond",
  },
  {
    name: "Lula",
    lastName: "Sawyer",
  },
  {
    name: "Hudson",
    lastName: "Hext",
  },
  {
    name: "Alden",
    lastName: "Senior",
  },
  {
    name: "Tory",
    lastName: "Hyland",
  },
  {
    name: "Constance",
    lastName: "Josephs",
  },
  {
    name: "Larry",
    lastName: "Kinsley",
  },
]);
</script>

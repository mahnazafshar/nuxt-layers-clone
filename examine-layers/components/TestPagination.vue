<template>
  <div class="p-5 flex flex-col">
    <!-- <nuxt-link :to="{ name: 'mahnaz', query: { page: 2 } }"
        >test nux-link</nuxt-link
      >

      <hr />
      <NuxtLink to="/about" target="_blank"
        >test nux-link go about page !!!</NuxtLink
      >
      <hr />
      <NuxtLink to="https://nuxtjs.org"> Nuxt website </NuxtLink> -->
    pagination test :
    <div class="bg-base-300 flex flex-col gap-y-5 ltr">
      <div class="flex justify-center">pagination with modelValue</div>
      <t-pagination
        :totalCount="100"
        :perPage="10"
        v-model="count"
        :withQuery="false"
        data-container-delete="bg-white"
        colorClass="bg-secondary"
        :appendQuery="false"
      ></t-pagination>

      <hr />

      <div class="flex justify-center">
        pagination with nuxt-link - pageRange -prev slot-next slot-page slot
      </div>
      <t-pagination
        :total-count="100"
        :per-page="5"
        :page-range="3"
        data-container-delete="bg-white"
        variant="secondary"
        query-name="page-filter"
        :withQuery="true"
      >
        <template #prev>
          <span>prev</span>
        </template>
        <template #next>
          <span>next</span>
        </template>
        <template #page="{ value, activeValue }"> {{ value }} </template>
      </t-pagination>
      <hr />

      <div class="flex justify-center">
        pagination with formName and item slot
      </div>
      <t-pagination
        :total-count="100"
        :per-page="5"
        data-container-delete="bg-white"
        form-name="formPagination"
      >
        <template #item="{ value, activeValue }">
          <div
            class="sm:h-10 sm:w-10 h-8 w-8 rounded-base flex items-center justify-center"
            :class="{ 'bg-[#503398] text-white': value == activeValue }"
          >
            {{ value }}
          </div>
        </template></t-pagination
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const count = ref(1);
// console.log()
</script>

<style scoped></style>

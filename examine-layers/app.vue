<template>
  <div>
    <nuxt-layout>
      <nuxt-page></nuxt-page>
    </nuxt-layout>
    <t-toast></t-toast>
  </div>
</template>
<script setup lang="ts">
provide('TSettings', {
  DButton:{
    container: {
      add: 'h-16 w-24 btn btn-neutral text-gray-400',
    },
    loading: {
      delete: ['loading-dots loading-md'],
      add: 'loading-bars loading-sm'
    }
  }
})
</script>

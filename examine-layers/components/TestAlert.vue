<template>
    <div class="flex flex-col gap-4">
      <h1 class="flex font-bold p-5">Daisy-UI Alert</h1>
      <d-alert>
        <template #text>
          <p>Alert Without Variant</p>
        </template>
      </d-alert>
      <d-alert :variant="DAlertTypes.default">
        <template #text>
          <p>Default Alert</p>
        </template>
      </d-alert>
      <d-alert :variant="DAlertTypes.info">
        <template #text>
          <p>Info Alert</p>
        </template>
      </d-alert>
      <d-alert :variant="DAlertTypes.success">
        <template #text>
          <p>Success Alert</p>
        </template>
      </d-alert>
      <d-alert :variant="DAlertTypes.warning">
        <template #text>
          <p>Warning Alert</p>
        </template>
      </d-alert>
      <d-alert :variant="DAlertTypes.error">
        <template #text>
          <p>Error Alert</p>
        </template>
      </d-alert>
      <d-alert 
        :variant="DAlertTypes.error" 
        data-container-add="w-80"
        data-icon-add="text-purple-700"
      >
        <template #text>
          <p>Error Alert</p>
        </template>
      </d-alert>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  
  </style>
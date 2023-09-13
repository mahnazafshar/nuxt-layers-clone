<template>
    <div class='flex flex-col gap-28 items-center my-8'>
  
      <div class='flex flex-col gap-4 items-center'>
        <div>
          <d-button class="btn btn-outline btn-primary" @click="toggleDropdownModel">test model</d-button>
          dropdownModel : {{ dropdownModel }}
        </div>
        <d-dropdown v-model="dropdownModel" :items="items">
          <template #trigger>Click On Me</template>
          <template #item="{item}">
            <div>{{ item.title }}</div>
          </template>
        </d-dropdown>
      </div>
  
      <div class='flex flex-col gap-4 items-center'>
        <h1 class="font-bold">should click outside to close dropdown</h1>
        <div>
          <d-button class="btn btn-primary" @click="toggleDropdown">test model</d-button>
          dropdownOutSideClickModel : {{ dropdownOutSideClickModel }}
        </div>
        <d-dropdown v-model="dropdownOutSideClickModel" :items="items" :closeOnClickOutside="true">
          <template #trigger>Click On Me</template>
          <template #item="{item}">
            <div>{{ item.title }}</div>
          </template>
        </d-dropdown>
      </div>
      
      <d-dropdown 
        parentTag="div" 
        childTag="div" 
        :items="items"
        data-container-add="relative flex items-center"
        data-label-add="text-red-500"
        data-parentTag-add="text-blue-500 mt-4 ml-8"
        data-childTag-add="m-8"
      >
        <template #trigger>with tag</template>
        <template #item="{item}">
          <div>{{ item.title }}</div>
        </template>
      </d-dropdown>
      
      <d-dropdown :items="items" :hover="true">
        <template #trigger>Hover Me</template>
        <template #item="{item}">
          <div>{{ item.title }}</div>
        </template>
      </d-dropdown>
      
      <d-dropdown :items="items" class="dropdown-left">
        <template #trigger>Dropdown open & left</template>
        <template #item="{item}">
          <div>{{ item.title }}</div>
        </template>
      </d-dropdown>
    </div>
  </template>
  
  <script setup lang="ts">
  const dropdownModel = ref(false)
  function toggleDropdownModel() {
    dropdownModel.value = !dropdownModel.value;
  }
  
  const dropdownOutSideClickModel = ref(false)
  function toggleDropdown(){
    dropdownOutSideClickModel.value = !dropdownOutSideClickModel.value
  }
  
  const items =  [
    { title: "title1", desc: "desc1" },
    { title: "title2", desc: "desc2" },
  ]
  </script>
  <style scoped>
  
  </style>
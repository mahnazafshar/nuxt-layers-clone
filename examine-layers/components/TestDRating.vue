<template>
    <div class="flex flex-col gap-8 items-center">
      <div>
        <d-button class="btn btn-sm mr-3" @click="resetRating">reset</d-button>
        <d-rating data-container-delete="-scale-x-100" data-icon-add="bg-purple-600" v-model="selectedRating" name="rating-1" :totalStars="5" iconClass="mask-star-2"></d-rating>
        <p>Selected Rating: {{ selectedRating }}</p>
      </div>
      <div>
        <d-button class="btn btn-sm mr-3"  @click="resetHalfRating">reset</d-button>
        <d-rating data-halfIcon-add="bg-orange-500" data-halfIcon-delete="bg-green-500" v-model="selectedHalfRating" name="rating-2" :totalStars="6" useHalfStars class="rating-lg rating-half"></d-rating>
        <p>Selected Rating: {{ selectedHalfRating }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  provide('d-rating-icon-class', 'mask-star-2')

  const selectedRating = ref(2);
  const resetRating = () => {
    selectedRating.value = 0;
  };

  const selectedHalfRating = ref(1.5);
  const resetHalfRating = () => {
    selectedHalfRating.value = 0;
  };
  
  </script>
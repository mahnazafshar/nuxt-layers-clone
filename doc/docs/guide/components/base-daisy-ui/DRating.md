# DRating

DRating is a set of radio buttons that allow the user to rate something.

## props

| name         | type    | Default   | description                                                                                                         |
| ------------ | ------- | --------- | ------------------------------------------------------------------------------------------------------------------- |
| name         | string  | -         | a string representing the radio button group name.                                                                  |
| totalStars   | number  | 5         | a number representing the total number of stars to display                                                          |
| useHalfStars | boolean | false     | determines whether to use half-star ratings or not. if you want half stars make it true and use `rating-half` class |
| iconClass    | string  | mask-star | class for get type of rate input                                                                                    |
| modelValue   | number  | -         | index of selected stars                                                                                             |
| v-model      | number  | -         | if set v-model to 0, It's used for reset selected stars                                                             |

## style of stars

```vue
<!--
  you can use these in `iconClass` to change shapes of radio buttons: 
  1. mask-star 
  2. mask-star-2 
  3. mask-heart
-->

<!--
  you can also use these classes to change size of radio buttons: 
  1. rating-lg
  2. rating-md
  3. rating-sm
  4. rating-xs
-->

<d-rating
  name="rating"
  :totalStars="5"
  iconClass="mask-star-2 bg-orange-400"
  class="rating-lg">
</d-rating>
```

## half star

```vue
<d-rating
  name="rating-2"
  :totalStars="5"
  useHalfStars
  class="rating-half"></d-rating>
```

## with v-model

```vue
<template>
  <div class="flex flex-col gap-8 items-center">
    <div>
      <d-button class="btn btn-sm mr-3" @click="resetRating">reset</d-button>
      <d-rating
        v-model="selectedRating"
        name="rating"
        :totalStars="5"></d-rating>
      <p>Selected Rating: {{ selectedRating }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedRating = ref(2);
const resetRating = () => {
  selectedRating.value = 0;
};
</script>
```

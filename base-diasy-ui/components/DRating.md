#### props

| name         | type    | Default   | description                                                |
| ------------ | ------- | --------- | ---------------------------------------------------------- |
| name         | string  | -         | a string representing the radio button group name.         |
| totalStars   | number  | 5         | a number representing the total number of stars to display |
| useHalfStars | boolean | false     | determines whether to use half-star ratings or not         |
| iconClass    | string  | mask-star | class for get type of rate input                           |
| modelValue   | number  | -         | index of selected stars                                    |
| v-model      | number  | 0         | is for reset selected stars                                |

```vue
<div>
//use `iconClass="mask-star-2 bg-orange-400"` for change type and color of rate input. we have `mask-star`, `mask-star-2` and `mask-heart` types of input.
  <d-button class="btn btn-sm mr-3" @click="resetRating">reset</d-button>
  <d-rating v-model="selectedRating" name="rating-1" :totalStars="5" iconClass="mask-star-2 bg-orange-400"></d-rating>
  <p>Selected Rating: {{ selectedRating }}</p>
</div>
<div>
//add `rating-half` class to use half-star ratings and `rating-lg` for size of input.
  <d-button class="btn btn-sm mr-3"  @click="resetHalfRating">reset</d-button>
  <d-rating v-model="selectedHalfRating" name="rating-2" :totalStars="5" useHalfStars class="rating-lg rating-half"></d-rating>
  <p>Selected Rating: {{ selectedHalfRating }}</p>
</div>
```

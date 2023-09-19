#### props

| name           | type            | Default | description                                                                                                          |
| -------------- | --------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| modelValue     | string  |  | ex:1390/8/16       |                                                                                                                      |
| name           | string          | -       | for label                                                                                                            |
| label          | string          | -       | determines                                                                    |                                                                            |                                                           
year_start   | number  |  1319  | start of year in dropdown of year
yaear_end  | number | 1390 | end of year in dropdown of year
separator  | string | / | separator of day-month-year for ex:1390/11/25
placeholderDay  | string | روز | placeholder of day that inject from birthday-placeholder-day
placeholderMonth | string  | ماه | placeholder of month that inject form birthday-placeholder-month
placeholderYear | string | سال | placeholder of year that inject from birthday-placeholder-year



```vue
    birthday::{{ birthday }}
    <v-form @submit="onSubmit" :validation-schema="schema">
      <v-birth-day
        label="تاریخ تولد"
        v-model="birthday"
        name="birthday"
        data-label-add="text-primary"
        data-select-day-add="w-full"
      >
      </v-birth-day>
      <d-button class="btn btn-primary" type="submit">submit </d-button>
    </v-form>
```

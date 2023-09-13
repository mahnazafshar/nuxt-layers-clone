#### props

| name           | type            | Default | description                                                                                                          |
| -------------- | --------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| modelValue     | string, number  | -       |                                                                                                                      |
| name           | string          | -       | for label                                                                                                            |
| label          | string          | -       | determines whether to use half-star ratings or not                                                                   |
| successMessage | string          | -       | for show success message under select tag                                                                            |
| placeholder    | string          | -       | set placeholder for select tag                                                                                       |
| items          | Array of Object | -       | items to show in dropdown for example : [{value: 1, text:'A', disabled: false},{value: 2, text:'B', disabled: true}] |
| labelField     | string          | label   | label field                                                                                                          |
| valueField     | string          | value   | value field                                                                                                          |
| disabled       | boolean         | false   | for disable select                                                                                                   |
| color          |                 |         | item of interface VSelectColor                                                                                       |
| size           |                 |         | item of interface VSelectSize                                                                                        |

| name      | description               |
| --------- | ------------------------- |
| leftLabel | show left label of select |

```vue
//for left label and disable select
<v-select
  name="status"
  :items="status"
  label-field="text"
  value-field="value"
  :disabled="true"
  label="disable select for test"
>
  <template #leftLabel>
    <span>**left label**</span>
  </template>
</v-select>
//set color and size for select
<v-select
  name="status"
  :items="status"
  label-field="text"
  value-field="value"
  :color="VSelectColor.accent"
  :size="VSelectSize.sm"
>
</v-select>
//With form-control
<v-select
  v-model="form.firstName"
  name="firstName"
  :items="name"
  label-field="text"
  value-field="value"
  placeholder="select name"
></v-select>
```

#### props

| Props          | Type                             | Default | Description                                                                                                                                  |
| -------------- | -------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| name           | string                           | ''      | name is required                                                                                                                             |
| label          | string                           | ''      | label of checkbox                                                                                                                            |
| v-model        | string, number, boolean          | false   | if you are using v-model do not set initialValue in the form and must tell VCheckbox you are using v-model by set useModelValue prop to true |
| useModelValue  | boolean                          | false   | if want use v-mode                                                                                                                           |
| disabled       | boolean                          | false   | for disable checkbox                                                                                                                         |
| successMessage | string                           |         | for show success message under checkbox                                                                                                      |
| checkedValue   | string,boolean,number            |         | value when checkbox is checked                                                                                                               |
| uncheckedValue | string,boolean,number            |         | value when checkbox is not checked                                                                                                           |
| color          | item of interface VCheckboxColor |
| size           | item of interface VCheckSize     |

#### slots

|name |description
|label |show label of checkobx
|leftLabel |show left label of checkobx

---

     checkbox with same name:
      <VCheckbox
        checked-value="hi"
        name="job"
        label="has checkedValue for initial value"
        :color="VCheckboxColor.info"
        :size="VCheckSize.xs"
      ></VCheckbox>
      <VCheckbox
        name="job"
        label="has not!! checkedValue for initial value "
        :color="VCheckboxColor.accent"
      ></VCheckbox>
      <hr />
      <VCheckbox
        name="test"
        v-model="form.test"
        :use-model-value="true"
        label="with V-Model?"
        :color="VCheckboxColor.secondary"
        :size="VCheckSize.lg"
      ></VCheckbox>

      <hr />
      <VCheckbox
        :checked-value="true"
        name="hasCar"
        label="checkbox for test disable"
        :color="VCheckboxColor.error"
        :disabled="true"
      >
        <template #leftLabel
          ><span class="mx-5">**has left label**</span></template
        >
      </VCheckbox>

      <hr />

<VCheckbox
        checked-value="fronted"
        name="programmer"
        :color="VCheckboxColor.info"
      >
<template #label>
<span
            >checkbox with checked value but not set initial value in form</span
          >
</template>
</VCheckbox>

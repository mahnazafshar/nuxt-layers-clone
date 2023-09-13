#### props

| Props          | Type                          | Default |                                                                                                                                           | Description |
| -------------- | ----------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| name           | string                        | ''      | name is required                                                                                                                          |
| label          | string                        | ''      | label of VRadio                                                                                                                           |
| v-model        | string, number, boolean       | false   | if you are using v-model do not set initialValue in the form and must tell VRadio you are using v-model by set useModelValue prop to true |
| useModelValue  | boolean                       | false   | if want use v-model                                                                                                                       |
| disabled       | boolean                       | false   | for disable                                                                                                                               |
| VRadio         |
| successMessage | string                        |         | for show success message under VRadio                                                                                                     |
| value          | string,boolean,number         |         | value of radio                                                                                                                            |             |
| color          | item of interface VRadioColor |
| size           | item of interface VRadioSize  |

#### slots

|name |description
|label |show label of VRadio
|leftLabel |show left label of VRadio

---

  <div>
    <h2>Radio :</h2>

    <VRadio
      value="tea"
      name="drinks"
      label="has value for initial value"
      :color="VRadioColor.info"
    ></VRadio>
    <VRadio
      name="drinks"
      label="has not!! value for initial value "
      :color="VRadioColor.accent"
    ></VRadio>
    <hr />
    <VRadio
      name="radioModel"
      v-model="form.radioModel"
      :use-model-value="true"
      label="with V-Model?"
      :color="VRadioColor.secondary"
      :size="VRadioSize.lg"
      :disabled="true"
    ></VRadio>

    <hr />
    <VRadio
      :value="true"
      name="hasCar"
      label="radio for test disable"
      :color="VRadioColor.error"
      :size="VRadioSize.xs"
    >
      <template #leftLabel><span class="mx-5">left-label</span></template>
    </VRadio>

    <hr />
    <VRadio value="backend" name="programmer" :color="VRadioColor.info">
      <template #label>
        <span>radio with value but not set initial value in form</span>
      </template>
    </VRadio>
    *********************************
    <hr />
    <VRadio
      name="favorite"
      v-model="form.favorite"
      value="coffee"
      :use-model-value="true"
      label="your favorite"
      :color="VRadioColor.secondary"
      :size="VRadioSize.lg"
    ></VRadio>

  </div>

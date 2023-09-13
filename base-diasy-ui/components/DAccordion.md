#### props

| name           | type    | Default                            | description                                                          |
| -------------- | ------- | ---------------------------------- | -------------------------------------------------------------------- |
| items          | array   | array of collapsible               |                                                                      |
| name           | string  | name of radio input and is require |
| hasArrow       | boolean | false                              | show arrow icon front of title                                       |
| hasPlus        | boolean | false                              | show plus/minus icon front of title                                  |
| forceOpen      | boolean | false                              | if true always collapse is opened                                    |
| forceClose     | boolean | false                              | if true always collapse is closed                                    |
| isJoin         | boolean | false                              | if to join the items together and handle border radius automatically |
| modelValue     | number  | index of selected item             |
| titleClass     | string  | ''                                 | class title                                                          |
| contentClass   | string  | ''                                 | class content                                                        |
| containerClass | string  | ''                                 | class main selector of accordion                                     |
| wrapperClass   | string  | ''                                 | class wrapper of items loop                                          |

#### slots

| Name    | Description  |
| ------- | ------------ |
| title   | show title   |
| content | show content |

---

---

test DAccordion with has arrow
<d-accordion
:items="accordionTest"
name="accordion-test"
containerClass="bg-base-200 "
wrapper-class="gap-y-3"
:has-arrow="true"
data-container-add="w-80"
data-innerContainer-add="bg-red-100"
data-radioButton-delete="peer"
data-title-add="text-blue-500"
data-content-add="text-purple-800"

>

    <template #title="{ title }"
      ><div>collapse with focus-{{ title }}</div></template
    >
    <template #content="{ content }"
      ><div>content is : {{ content }}</div></template
    >

  </d-accordion>
  <d-accordion
    :items="accordionTest"
    name="accordion-test"
    containerClass="bg-base-200 "
    wrapper-class="gap-y-3"
    :has-arrow="true"
  >
    <template #title="{ title }"
      ><div>{{ title }}</div></template
    >
  </d-accordion>
  <div>
    test with forceOpen
    ####################################################################################
  </div>
  <d-accordion
    :items="accordionTest"
    name="accordion-test"
    containerClass="bg-base-200 "
    wrapper-class="gap-y-3"
    :force-open="true"
  >
  </d-accordion>
  <div>
    test with forceClose
    ####################################################################################
  </div>
  <d-accordion
    :items="accordionTest"
    name="accordion-test"
    containerClass="bg-base-200 "
    wrapper-class="gap-y-3"
    :force-close="true"
  >
  </d-accordion>

  <div>
    test with select second item and join items::{{ selectedItem }}
    ####################################################################################
  </div>
  <d-accordion
    :items="accordionTest"
    v-model="selectedItem"
    name="accordion-test"
    containerClass="bg-base-200 "
    :is-join="true"
  >
  </d-accordion>
  *****************************************************************************************************************************
  test DAccordion toggleWithHeader=false
  <d-accordion
    :items="accordionTest"
    name="accordion-test"
    containerClass="bg-base-200 "
    wrapper-class="gap-y-3"
    :has-arrow="true"
    content="description of collapse "
    :toggleWithHeader="false"
  >
  </d-accordion>

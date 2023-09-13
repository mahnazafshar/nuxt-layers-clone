#### props

|name |type |Default |description|

---

|title |string
|content |string
|isFocus |boolean |false |This collapse works with focus. When div loses focus, it gets closed|
|canToggle |boolean |false |if true can open and close (toggle collapse)|
|hasAnimation |boolean |true |collapse open and close with animation|
|hasArrow |boolean |false |show arrow icon front of title|
|hasPlus |boolean |false |show plus/minus icon front of title|
|forceOpen |boolean |false |if true always collapse is opened|
|forceClose |boolean |false |if true always collapse is closed|

#### slots

|name |description |

---

|title |show title of collapse|
|content |show content of collapse|

##### modelValue

type:boolean if sent model value collapse can toggle with change modelValue

    test d-collapsible
    *****************************************************************************************************************************
    <d-collapsible
      class="bg-base-200 text-primary-content focus:bg-secondary focus:text-secondary-content"
      :is-focus="true"
      content="description of collapse "
    >
      <template #title><div>collapse with focus</div></template>
    </d-collapsible>

    <d-collapsible
      class="bg-base-200"
      :can-toggle="true"
      title-class="bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
      content-class="bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
    >
      <template #title><div>collapse with canToggle</div></template>
      <template
        #content
        class="bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
        ><div>click me to show/hidden content</div></template
      >
    </d-collapsible>

    <d-collapsible class="bg-base-200 border" :has-animation="false">
      <template #title><div>collapse without animation</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>

    <d-collapsible class="bg-base-200" :has-arrow="true">
      <template #title><div>collapse with Arrow</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>

    <d-collapsible class="bg-base-200" :has-plus="true">
      <template #title><div>collapse with plus/minus icon</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>

    <d-collapsible class="bg-base-200" :force-open="true">
      <template #title><div>collapse open</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>

    <d-collapsible class="bg-base-200" :force-close="true">
      <template #title><div>collapse closed</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>

    <hr />
    <d-button
      class="btn btn-outline btn-primary w-[fit-content] mt-8"
      @click="toggleCollapseModel"
    >
      click to open collapse
    </d-button>

    <d-collapsible
      class="bg-base-200"
      :can-toggle="true"
      v-model="collapseModel"
    >
      <template #title><div>collapse open</div></template>
      <template #content><div>content</div></template>
    </d-collapsible>


    <script setup lang="ts">

const collapseModel = ref(false);
function toggleCollapseModel() {
collapseModel.value = !collapseModel.value;
}

</script>

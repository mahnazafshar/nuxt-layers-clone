# DCollapse

DCollapse is used for showing and hiding content.

## props

| name         | type    | Default | description                                                          |
| ------------ | ------- | ------- | -------------------------------------------------------------------- |
| title        | string  | -       | title of collapse                                                    |
| content      | string  | -       | content of collapse                                                  |
| isFocus      | boolean | false   | This collapse works with focus. When div loses focus, it gets closed |
| canToggle    | boolean | true    | if true can open and close (toggle collapse)                         |
| hasAnimation | boolean | true    | collapse open and close with animation                               |
| hasArrow     | boolean | false   | show arrow icon front of title                                       |
| hasPlus      | boolean | false   | show plus/minus icon front of title                                  |
| forceOpen    | boolean | false   | if true always collapse is opened                                    |
| forceClose   | boolean | false   | if true always collapse is closed                                    |
| modelValue   | boolean | false   | if sent model value collapse can toggle with change modelValue       |

## slots

| name    | description              |
| ------- | ------------------------ |
| title   | show title of collapse   |
| content | show content of collapse |

## with v-model

```vue
<template>
  <div class="p-3 flex flex-col gap-4">
    <button
      class="btn btn-outline btn-primary w-[fit-content] mt-8"
      @click="toggleCollapseModel">
      click to open collapse
    </button>

    <d-collapsible
      class="bg-base-200"
      :can-toggle="true"
      v-model="collapseModel">
      <template #title>
        <div>Lorem ipsum</div>
      </template>
      <template #content>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae
          architecto provident alias eos ad aliquid qui, perferendis dicta
          eveniet eum. Vitae dicta atque molestias saepe perspiciatis nam,
          dolore hic esse.
        </div>
      </template>
    </d-collapsible>
  </div>
</template>

<script lang="ts" setup>
const collapseModel = ref(false);
function toggleCollapseModel() {
  collapseModel.value = !collapseModel.value;
}
</script>
```

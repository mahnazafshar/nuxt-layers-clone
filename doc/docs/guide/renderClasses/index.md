# renderClasses

In this project we have a `useRendeClass` composable in global-composable layer. We defined data types of renderClasses and it also return `renderClass` and `attrsToBind`. <br>

## How implement render class?

Here I have given the example (the DButton component) so that you can see how the ‍‍‍‍`‍‍‍renderClass‍‍‍‍` is implemented:

```vue
<template>
  <button
    data-name="container"
    :class="
      renderClass('relative', 'container', { 'pointer-events-none': loading })
    "
    v-bind="attrsToBind">
    <span
      data-name="loadingContainer"
      :class="renderClass('', 'loadingContainer', { invisible: loading })">
      <slot />
    </span>
    <span
      v-if="loading"
      data-name="loading"
      :class="
        renderClass(
          'loading loading-dots loading-md absolute transform top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2',
          'loading'
        )
      " />
  </button>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const { renderClass, attrsToBind } = useRenderClass("DButton");

interface Props {
  loading?: boolean;
}
withDefaults(defineProps<Props>(), {
  loading: false,
});
</script>
```

## How use render class?

Styling can be done in 3 ways:`Add`, `delete` and `replace`.<br>
`add`, which is clear, adds a class.<br>
`Delete` is the same as deleting a class.<br>
But `replace` specifies the class that wants to replace the current class.<br>
| ⚠️ Warning |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Be careful, we only use replace when we really want the new class to replace the previous class and the previous class must exist inside the rendering for the replacement operation to take place, because if the previous class does not exist, the new class will not be replaced in any way.<br>It is better to delete the desired class first and then add the new class instead of using repress. |

In our opinion, this method is better for styling because we don't have to deal with bugs related to css cascade, or at least they happen less often.<br>
here is the example of change style of DButton:

```vue
<script>
provide("TSettings", {
  componentName: {
    elementName: {
      add: "classes...", // pass string of classes
      delete: [" classes..."], // pass array of strings of classes
      replace: { The class used in the render-class: "classes that you want to be replaced..." }, // pass object that the first element is the objectBinding class and the second element is classes that you want to be replaced
    },
  },
});
</script>
```

For example:

```ts
provide("TSettings", {
  DButton: {
    container: {
      add: "h-16 w-24 btn btn-neutral text-gray-400",
    },
    loading: {
      delete: ["loading-dots", "loading-md"],
      add: "loading-bars loading-sm",
    },
    loadingContainer: {
      replace: {
        invisible: "text-red-500", // invisible is the objectBinding class that call in loadingContainer and we replace 'invisible' with 'text-red-500'
      },
    },
  },
});
```

Well, this was global so far.<br>

Now suppose that one day the designer comes to tell you that I want you to change a certain component only here. Consider this DButton. We want the attribute method `data-name="content"`. Let's just change the existing one. Here we come to the DButton tag and change it like this:<br>

```vue
<d-button
  data-container-delete="btn-neutral text-gray-400"
  data-container-add="bg-red-600 text-white">custom button</d-button>
```

This way we can give local style.<br>

## renderClass

The `renderClass` get 3 parameters :<br>
`className`: set classes here.<br>
`elementName`: get the name of the class (we usually set it with name of components).<br>
`objectBinding`: for binding objects in class.<br>

This is one example of how we use the renderClass:<br>
`class="renderClass('className', 'elementName', objectBinding)"`

## attrsToBind

In order to remove extra local data attributes you can use `attrsToBind`.<br>

Remember that you should pass `inheritAttrs: false,` in script in order to get the right performance.

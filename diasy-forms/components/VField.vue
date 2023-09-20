<template>
  <Field v-bind="$attrs">
    <!-- <slot></slot> -->
    <template
      v-for="(_, slot) of $slots"
      #[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </Field>
</template>

<script setup lang="ts">
import { Field } from "vee-validate";
name: "VField";
</script>

<template>
  <Form v-bind="$attrs">
    <!-- <slot></slot> -->
    <template v-for="(_, slot) of $slots" v-slot:[slot]="scope"
      ><slot :name="slot" v-bind="scope"
    /></template>
  </Form>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
name: "VForm";
</script>

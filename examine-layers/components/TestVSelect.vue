<template>
    <div class="mt-8 max-w-[20rem] mx-auto">
        <d-modal v-model="dialogModel" title="test v-select in modal">
            <v-form
                class="VForm"
                @submit="onSubmit"
                :validation-schema="schema"
            >
                <v-select v-model="form.firstName" name="firstName" :items="nameItems" label-field="text" value-field="value" placeholder="select name"></v-select>
                <v-select v-model="form.grade" name="grade" :items="gradeItems" label-field="text" value-field="value" placeholder="select grade"></v-select>
                <v-select v-model="form.status" name="status" :items="statusItems" label-field="text" value-field="value"></v-select>
                <d-button class="btn btn-primary" type="submit">submit </d-button>
            </v-form>
        </d-modal>
        <button class="btn btn-primary" @click="openDialog">open Modal</button>
        <v-form
            class="VForm my-8"
            @submit="onSubmit"
            :validation-schema="schema"
            :initialValues="{
                firstName: 2,
            }"
            v-slot="{ values }"
        >
            {{ values }}
            <v-select name="firstName" :items="nameItems" label-field="text" value-field="value"></v-select>
            <v-select v-model="form.grade" name="grade" :items="gradeItems" label-field="text" value-field="value" placeholder="select grade"></v-select>
            <v-select v-model="form.status" name="status" :items="statusItems" label-field="text" value-field="value" placeholder="select status"></v-select>
            <d-button class="btn btn-primary" type="submit">submit </d-button>
        </v-form>
        <v-select 
            name="status" 
            :items="statusItems" 
            label-field="text" 
            value-field="value" 
            :disabled="true"
            label="disable select for test"
        >
            <template #leftLabel>
                <span>**left label**</span>
            </template>
        </v-select>
        <v-select 
            name="status" 
            :items="statusItems" 
            label-field="text" 
            value-field="value" 
            :color="VSelectColor.accent" 
            :size="VSelectSize.sm"
        >
        </v-select>
    </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
provide("v-select-size", VSelectSize.xs);
const { model: dialogModel, open: openDialog } = useUiState();

const form = reactive({
    firstName: 2,
    grade: '',
    status: '',
});

const nameItems = [
    {value: 1, text:'John'},
    {value: 2, text:'Julia'},
    {value: 3, text:'Sarah'},
]
const gradeItems = [
    {value: 1, text:'A', disabled: false},
    {value: 2, text:'B', disabled: true},
    {value: 3, text:'C', disabled: false},
]
const statusItems = [
    {value: 1, text:'passed'},
    {value: 2, text:'failed'},
]

const schema = yup.object({
    firstName: yup.string().required(),
    grade: yup.string().required(),
    status: yup.string().required(),
});

function onSubmit(values: any) {
  console.log("submit", values);
}
</script>
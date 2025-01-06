<script setup lang="ts">
import { VBreadcrumbs } from 'vuetify/components';
defineProps<{
    title: string,
    items?: VBreadcrumbs['$props']['items'],
}>();
</script>

<template>
    <div class="bg-secondary">
        <h2>{{ title }}</h2>
        <v-breadcrumbs-custom :items="items"/>
    </div>
</template>

<style>
</style>
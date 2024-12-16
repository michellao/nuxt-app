<script setup lang="ts">
const isAuthenticate = await useFetch('/api/users/@me');
</script>

<template>
    <div v-if="isAuthenticate.data.value !== null">
        <ListingGuilds/>
    </div>
    <div v-else>
        <h2>The goal of this project</h2>
        <p>Just to manage messages send on Discord</p>
    </div>
</template>

<style>
</style>

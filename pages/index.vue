<script setup lang="ts">
const isAuthenticate = await useFetch('/api/users/@me');
</script>

<template>
    <div v-if="isAuthenticate.data.value !== null">
        <ListingGuilds/>
    </div>
    <div v-else class="main">
        <h2>The goal of this project</h2>
        <p>Manage Discord message only</p>
    </div>
</template>

<style>
.main {
    margin: 8px;
}
</style>

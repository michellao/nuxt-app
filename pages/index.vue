<script setup lang="ts">

const cookies = extractCookieAuthenticate();
const isAuthenticate = false;
</script>

<template>
    <div v-if="isAuthenticate">
        <ListingGuilds/>
    </div>
    <div v-else>
        <h2>The goal of this project</h2>
        <p>Just to manage messages send on Discord</p>
    </div>
</template>

<style>
</style>

<script setup lang="ts">
import ListingGuilds from '~/components/ListingGuilds.vue';

const cookies = extractCookieAuthenticate();
const isDisconnect = useState(() => !isAuth(cookies));
</script>

<template>
    <div v-if="isDisconnect">
        <h2>The goal of this project</h2>
        <p>Just to manage messages send on Discord</p>
    </div>
    <div v-else>
        <ListingGuilds/>
    </div>
</template>

<style>
</style>

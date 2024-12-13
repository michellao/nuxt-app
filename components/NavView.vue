<script setup lang="ts">
const config = useRuntimeConfig();
const cookies = extractCookieAuthenticate();
const isAuthenticate = false;
// const userMe = await getUser();
const urlOauth = config.public.discord.oauth2.url;
</script>

<template>
    <div><h1>Managements Messages</h1></div>
    <div v-if="isAuthenticate">
        <!-- {{ userMe?.global_name }} -->
        <a href="/api/logout-discord">
            <v-btn-secondary icon="mdi-logout"/>
        </a>
    </div>
    <div v-else>
        <a
            :href="urlOauth"
        >
            <v-btn-secondary append-icon="mdi-login">Login with Discord</v-btn-secondary>
        </a>
    </div>
</template>

<style>
a:link, a:visited {
    text-decoration: none;
}
</style>

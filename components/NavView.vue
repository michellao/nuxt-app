<script setup lang="ts">
const config = useRuntimeConfig();
const userMe = await useFetch('/api/users/@me');
const urlOauth = config.public.discord.oauth2.url;
</script>

<template>
    <div><h1>Managements Messages</h1></div>
    <div v-if="userMe.data.value !== null">
        {{ userMe.data.value.global_name }}
        <NuxtLink to="/api/logout-discord">
            <v-btn-secondary icon="mdi-logout"/>
        </NuxtLink>
    </div>
    <div v-else>
        <NuxtLink
            :to="urlOauth"
        >
            <v-btn-secondary append-icon="mdi-login">Login with Discord</v-btn-secondary>
        </NuxtLink>
    </div>
</template>

<style>
a:link, a:visited {
    text-decoration: none;
}
</style>

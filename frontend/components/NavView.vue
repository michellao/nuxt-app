<script setup lang="ts">
const cookies = extractCookieAuthenticate();
const isDisconnect = useState(() => !isAuth(cookies));
const userMe = await getUser();
</script>

<template>
    <div><h1>Managements Messages</h1></div>
    <div v-if="isDisconnect">
        <a
            href="https://discord.com/oauth2/authorize?client_id=1303701511888703509&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth-discord&scope=identify+messages.read+guilds"
        >
            <v-btn-secondary append-icon="mdi-login">Login with Discord</v-btn-secondary>
        </a>
    </div>
    <div v-else>
        {{ userMe?.global_name }}
        <a href="/api/logout-discord">
            <v-btn-secondary icon="mdi-logout"/>
        </a>
    </div>
</template>

<style>
a:link, a:visited {
    text-decoration: none;
}
</style>

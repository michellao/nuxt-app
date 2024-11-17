<script setup lang="ts"></script>

<template>
    <div class="nav">
        <div>
                <a
                    href="https://discord.com/oauth2/authorize?client_id=1303701511888703509&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth-discord&scope=identify+messages.read"
                >
                    <v-btn-secondary append-icon="md:login">Login with Discord</v-btn-secondary></a
                >
        </div>
    </div>
</template>

<style>
a:link, a:visited {
    text-decoration: none;
}
nav div {
    margin-right: 16px;
}
</style>
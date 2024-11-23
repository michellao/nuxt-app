<script setup lang="ts">
import ListingMessages from '~/components/ListingMessages.vue';

const cookies = extractCookieAuthenticate();
const isDisconnect = useState(() => !isAuth(cookies));
</script>

<template>
    <nav class="bg-primary"><NavView/></nav>
    <main>
        <div v-if="isDisconnect">
            <h2>The goal of this project</h2>
            <p>Just to manage messages send on Discord</p>
        </div>
        <div v-else>
            <!-- <ListingMessages/> -->
        </div>
    </main>
</template>

<style>
nav {
    display: flex;
    padding: 24px 0;
    justify-content: space-between;
}
nav div {
    margin: 0 8px;
}
main {
    margin: 12px 8px;
}
@media screen and (min-width: 768px) {
    nav div {
        margin: 0 24px;
    }
}
</style>

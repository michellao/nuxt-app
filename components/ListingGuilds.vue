<script setup lang="ts">
const guilds = await getUserGuilds();
</script>

<template>
    <h2 class="bg-secondary">Guilds</h2>
    <v-list-guilds>
        <NuxtLink
            v-for="g of guilds"
            :key="g.id"
            :to="`/guilds/${g.id}`"
        >
            <v-list-item :title="g.name"/>
        </NuxtLink>
    </v-list-guilds>
</template>

<style>
</style>

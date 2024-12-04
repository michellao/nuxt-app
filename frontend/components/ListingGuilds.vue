<script setup lang="ts">
const guilds = await getUserGuilds();
</script>

<template>
    <h2>Guilds</h2>
    <v-list>
        <NuxtLink
            v-for="g of guilds"
            :key="g.id"
            :to="`/guilds/${g.id}`"
        >
            <v-list-item :title="g.name"/>
        </NuxtLink>
    </v-list>
</template>

<style>
</style>

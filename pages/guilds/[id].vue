<script setup lang="ts">
import type { Channel } from '#build/imports';
import { z } from 'zod';

const route = useRoute();
const guilds = await getUserGuilds();
const { data, status } = await useFetch(`/api/discord/guilds/${route.params.id}/channels`);
type Channel = z.infer<typeof Channel>;
let channels: Channel[] | null = null;
if (status.value === 'success') {
    channels = data.value;
}
</script>

<template>
    <h2>Channels in <b>{{ guilds.find(g => g.id === route.params.id)?.name }}</b></h2>
    <v-list>
        <NuxtLink
            :to="`/channels/${c.id}`"
            v-for="c in channels"
            :key="c.id"
        >
            <v-list-item
                :title="c.name"
            />
        </NuxtLink>
    </v-list>
</template>

<style></style>

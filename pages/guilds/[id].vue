<script setup lang="ts">
import type { VBreadcrumbs } from 'vuetify/components';
import { z } from 'zod';

const route = useRoute();
const guilds = await getUserGuilds();
const guildId = route.params.id;
const actualGuildName = guilds.find(g => g.id === guildId)?.name ?? '';
const { data, status } = await useFetch(`/api/discord/guilds/${guildId}/channels`);
type Channel = z.infer<typeof Channel>;
let channels: Channel[] | null = null;
let items: VBreadcrumbs['$props']['items'] = [
    {
        title: 'Guilds',
        href: '/',
    },
    {
        title: actualGuildName,
        href: `/guilds/${guildId}`
    }
];
if (status.value === 'success') {
    channels = data.value;
}
</script>

<template>
    <SubMenu title="Channels" :items="items"/>
    <v-list-guilds>
        <NuxtLink
            :to="`/guilds/${guildId}/channels/${c.id}`"
            v-for="c in channels"
            :key="c.id"
        >
            <v-list-item
                :title="c.name"
            />
        </NuxtLink>
    </v-list-guilds>
</template>

<style></style>

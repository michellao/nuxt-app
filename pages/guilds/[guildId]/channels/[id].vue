<script setup lang="ts">
import type { VBreadcrumbs } from 'vuetify/components';
import type { z } from 'zod';
import SubMenu from '~/components/SubMenu.vue';

const route = useRoute();
const guilds = await getUserGuilds();
const guildId = route.params.guildId;
const actualGuildName = guilds.find(g => g.id === guildId)?.name ?? '';
const channelId = route.params.id;
const channels = await useFetch(`/api/discord/guilds/${guildId}/channels`);
const actualChannelName = channels.data.value?.find(channel => channel.id === channelId)?.name ?? '';
const { data, status } = await useFetch(`/api/discord/channels/${channelId}/messages`);
type Message = z.infer<typeof Message>;
let items: VBreadcrumbs['$props']['items'] = [
    {
        title: 'Guilds',
        href: '/',
    },
    {
        title: actualGuildName,
        href: `/guilds/${guildId}`,
    },
    {
        title: actualChannelName,
        href: `/guilds/${guildId}/channels/${channelId}`,
    }
];
let messages: Message[] | null = [];
if (status.value === 'success') {
    messages = data.value;
}
</script>

<template>
    <SubMenu title="Messages" :items="items"/>
    <v-list-guilds>
        <v-list-item
            v-for="m in messages"
            :key="m.id"
            :title="m.content"
        />
    </v-list-guilds>
</template>

<style></style>
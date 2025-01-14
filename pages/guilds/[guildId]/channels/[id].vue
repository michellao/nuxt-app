<script setup lang="ts">
import mongoose from 'mongoose';
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
let messages = useState<Message[] | null>('messages', () => []);
if (status.value === 'success') {
    messages.value = data.value;
}
let debounceTimer: NodeJS.Timeout;
const checkBottom = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollPosition >= documentHeight) {
            const lastIdMessage = await $fetch(`/api/discord/channels/${channelId}/next-messages`);
            const { data, status } = await useFetch(`/api/discord/channels/${channelId}/messages?before=${lastIdMessage}`);
            if (status.value === 'success') {
                messages.value?.push(...data.value || []);
            }
        }
    }, 100);
}

onBeforeMount(() => {
    window.addEventListener('scroll', checkBottom);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', checkBottom);
});
</script>

<template>
    <SubMenu title="Messages" :items="items"/>
    <v-list-custom>
        <v-list-item
            v-for="m in messages"
            :class="m.type === MessageType.THREAD_CREATED ? 'created-thread' : ''"
            :key="m.id"
            :title="m.content"
        />
    </v-list-custom>
    <v-btn-secondary @click="checkBottom">Load more...</v-btn-secondary>
</template>

<style></style>

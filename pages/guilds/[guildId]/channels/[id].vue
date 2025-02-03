<script setup lang="ts">
import mongoose from 'mongoose';
import type { VBreadcrumbs } from 'vuetify/components';
import type { z } from 'zod';
import SubMenu from '~/components/SubMenu.vue';
const route = useRoute();
const guilds = await getUserGuilds();
const guildId = typeof route.params.guildId === 'string' ? route.params.guildId : null;
const actualGuildName = guilds.find(g => g.id === guildId)?.name ?? '';
const channelId = typeof route.params.id === 'string' ? route.params.id : null;
const channels = await useFetch(`/api/discord/guilds/${guildId}/channels`);
const actualChannelName = channels.data.value?.find(channel => channel.id === channelId)?.name ?? '';
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
let messages = useState<Message[]>('messages', () => []);
if (channelId && import.meta.client) {
    const browserData = localStorage.getItem(channelId);
    if (browserData) {
        $fetch(`/api/discord/channels/${channelId}/clear-pagination`);
        messages.value = JSON.parse(browserData);
    } else {
        const { data, status } = await useFetch(`/api/discord/channels/${channelId}/messages`);
        if (status.value === 'success') {
            messages.value = data.value ?? [];
        }
    }
}
let debounceTimer: NodeJS.Timeout;
const checkBottom = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollPosition >= documentHeight && channelId) {
            const lastIdMessage = await $fetch(`/api/discord/channels/${channelId}/next-messages`);
            const { data, status } = await useFetch(`/api/discord/channels/${channelId}/messages?before=${lastIdMessage}`);
            if (status.value === 'success') {
                messages.value?.push(...data.value || []);
                localStorage.setItem(channelId, JSON.stringify(messages.value));
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

const filter = useState('filter', () => '');

const deleteAMessage = (messageId: string) => {
    $fetch(`/api/discord/channels/${channelId}/messages/${messageId}`, {
        method: 'DELETE',
    });
    const indexDeleted = messages.value?.findIndex(m => m.id === messageId);
    if (indexDeleted) {
        messages.value?.splice(indexDeleted, 1);
    }
}
</script>

<template>
    <SubMenu title="Messages" :items="items"/>
    <v-text-field append-inner-icon="mdi-magnify" v-model="filter"></v-text-field>
    <v-list-custom>
        <v-list-item
            v-for="m in messages?.filter((m) => m.content.toLowerCase().includes(filter.toLowerCase()))"
            :subtitle="m.type === MessageType.THREAD_CREATED ? 'created-thread' : ''"
            :key="m.id"
            :title="m.content"
        >
            <template v-slot:append>
                <v-btn
                    color="red"
                    icon="mdi-trash-can"
                    @click="deleteAMessage(m.id)"
                />
                <NuxtLink target="_blank" :to="`https://discord.com/channels/${guildId}/${channelId}/${m.id}`">
                    <v-btn
                        icon="mdi-open-in-new"
                    />
                </NuxtLink>
            </template>
        </v-list-item>
    </v-list-custom>
    <v-btn-secondary @click="checkBottom">Load more...</v-btn-secondary>
</template>

<style></style>

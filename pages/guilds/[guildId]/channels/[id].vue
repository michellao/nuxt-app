<script setup lang="ts">
import type { z } from 'zod';

const route = useRoute();
// const guilds = await getUserGuilds();
const channelId = route.params.id;
const { data, status } = await useFetch(`/api/discord/channels/${channelId}/messages`);
type Message = z.infer<typeof Message>;
let messages: Message[] | null = [];
if (status.value === 'success') {
    messages = data.value;
}
</script>

<template>
    <h2>Messages</h2>
    <v-list>
        <v-list-item
            v-for="m in messages"
            :key="m.id"
            :title="m.content"
        />
    </v-list>
</template>

<style></style>
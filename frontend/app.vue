<template>
  <v-app>
    <nav class="bg-primary"><NavView/></nav>
    <main>
      <NuxtPage/>
    </main>
  </v-app>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
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
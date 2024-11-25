<template>
  <v-app>
    <v-main>
      <v-container>
        <navbar />
        <router-view />
        <drawer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from '@/components/navigation/navbar.vue';
import Drawer from '@/components/navigation/drawer.vue';

</script>

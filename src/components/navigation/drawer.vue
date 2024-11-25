<template>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="@/assets/robo_face.png"
            title="RoboPD2"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            v-for="item in drawerItems"
            :key="item.name"
            :prepend-icon="item.icon"
            :title="item.name"
            :value="item.name"
            :to="item.to"
          />
        </v-list>
      </v-navigation-drawer>
</template>
<script setup>
import { drawerItems } from '@/config/drawer';

</script>
<style>

</style>

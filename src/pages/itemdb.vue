<template lang="">
  <v-card>
    <v-card-title>Item Database</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Search"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            label="Category"
            outlined
            dense
            :items="categories"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <v-card>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.id"
      >
        <v-list-item-avatar>
          <v-img :src="item.image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.category }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script setup>
import { items } from '@/items/items';

definePage({
  alias: ['/items']
});


</script>
<style lang="">

</style>

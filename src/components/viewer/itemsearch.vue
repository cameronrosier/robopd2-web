<template lang="">
  <v-card
    class="mx-auto text-center"
    max-width="1000"
  >
    <v-row no-gutters class="">
      <v-col cols="6" class="pr-2">
        <v-text-field
          v-model="searchQuery"
          label="Item Name"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="3" class="pr-2">
        <v-select
          :items="itemTypes"
          label="Item Type"
          v-model="itemType"
          outlined
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-btn
          color="primary"
          height="56"
          width="100%"
          @click="search"
        >
          Search
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const itemTypes = ref([
  'Unique',
  'Runeword'
])
const itemType = ref('')
const router = useRouter()

const search = async () => {
  if (!searchQuery.value || !itemType.value) return

  // Normalize the item type to lowercase for routing and API
  const normalizedItemType = itemType.value.toLowerCase()

  // Navigate to the viewer with item type and name as route params
  router.push('/viewer/' + normalizedItemType + '/' + searchQuery.value)
}
</script>

<style scoped>
/* You can add any scoped styles here if needed */
</style>

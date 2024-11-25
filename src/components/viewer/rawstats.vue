<template lang="">
  <v-card
      class="mx-auto text-center"
      max-width="1000"
    >
      <v-card-title
        class="justify-center text-center"
      >
        Stat Codes & Values
      </v-card-title>
      <v-card-actions class="justify-center">
        <v-expansion-panel>
          <v-expansion-panel-title>Stat Codes & Values</v-expansion-panel-title>
          <v-expansion-panel-text>
            Some content
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-list>
          <v-list-item
            v-for="(property, index) in viewer.itemProperties"
            :key="index"
          >
            <v-list-item-title
              class="ma-0 text-center text-body-2"
            >
              {{ property }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-actions>
    </v-card>
</template>

<script setup>
import { useViewerStore } from '@/stores/viewer'
import { storeToRefs } from 'pinia'

const viewerStore = useViewerStore()
const { viewer } = storeToRefs(viewerStore)
</script>
<style lang="">

</style>

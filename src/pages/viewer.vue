<template>
  <v-container
    class="d-flex justify-center align-center"
    style="height: 100vh;"
  >
    <v-col cols="12" class="px-0">
      <v-row justify="center" no-gutters >
        <v-col cols="12">
          <v-row>
            <v-card
              class="mx-auto text-center mb-5"
              max-width="1000"
            >
              <template v-slot:prepend>
                <v-icon color="surface-light" size="24">mdi-information</v-icon>
              </template>

              <template v-slot:subtitle><code>RoboPD2</code> is currently in development, please report incorrect stats by clicking the "Report Incorrect Stats (❗)" button.</template>
            </v-card>
          </v-row>
          <!-- Search bar and button row -->
          <v-row class="mt-5">
            <v-col cols="12">
              <itemsearch />
            </v-col>
          </v-row>
          <!-- ItemViewer row -->
          <v-row>
            <v-col cols="12">
              <uniqueviewer
                v-if="routeItemType === 'unique'"
              />
              <runewordviewer
                v-if="routeItemType === 'runeword'"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUniqueViewerStore } from '@/stores/uniqueViewer'
import { useRunewordViewerStore } from '@/stores/runewordViewer'
import { fetchItems } from '@/config/api'
import { processResistanceProperties } from '@/util/util'
import uniqueviewer from '@/components/viewer/uniqueviewer.vue'
import runewordviewer from '@/components/viewer/runewordviewer.vue'
import itemsearch from '@/components/viewer/itemsearch.vue'

const route = useRoute()
const uniqueViewerStore = useUniqueViewerStore()
const runewordViewerStore = useRunewordViewerStore()

// Keep these refs for route params handling
const routeItemName = ref(route.params.itemName)
const routeItemType = ref(route.params.itemType)

definePage({
  alias: ['/viewer/:itemType/:itemName']
})

const fetchData = async () => {
  try {
    const response = await fetchItems(route.params.itemType, route.params.itemName)

    if (routeItemType.value === 'unique') {
      uniqueViewerStore.updateViewer({
        itemName: response.item_data.name,
        itemType: response.item_type,
        itemBase: response.item_data.base,
        itemMaxSockets: response.item_data.max_sockets,
        itemProperties: [...response.item_data.properties],
        itemPropertyStrings: [...processResistanceProperties(response.item_data.property_strings)].filter(
          function (value, index, array) {
            return array.indexOf(value) === index
          }
        )
      })
    } else if (routeItemType.value === 'runeword') {
      runewordViewerStore.updateViewer({
        itemName: response.item_data.name,
        itemType: response.item_type,
        itemRunes: [...response.item_data.runes],
        itemBases: [...response.item_data.bases],
        itemProperties: [...response.item_data.properties],
        itemPropertyStrings: [...processResistanceProperties(response.item_data.property_strings)].filter(
          function (value, index, array) {
            return array.indexOf(value) === index
          }
        )
      })
    }
  } catch (error) {
    console.error(error)
    // Choose the appropriate store based on the item type
    if (routeItemType.value === 'unique') {
      uniqueViewerStore.clearViewer()
    } else if (routeItemType.value === 'runeword') {
      runewordViewerStore.clearViewer()
    }
  }
}

watch([() => route.params.itemType, () => route.params.itemName], () => {
  // Update local reactive refs
  routeItemType.value = route.params.itemType
  routeItemName.value = route.params.itemName

  // Fetch data when route changes
  fetchData()
}, { immediate: true })

onMounted(() => {
  if (routeItemName.value || routeItemType.value) {
    fetchData()
  }
})
</script>

<style scoped>
</style>

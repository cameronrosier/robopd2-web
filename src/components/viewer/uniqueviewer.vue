<template>
  <v-card
    class="mx-auto text-center"
    max-width="1000"
  >
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-img
          height="100px"
          :src="imageUrl"
          contain
          :aspect-ratio="16/9"
        ></v-img>
      </v-col>
      <v-col cols="2">
        <v-btn
          icon
          variant="text"
          class="position-absolute top-0 end-0 ma-2"
          style="z-index: 1;"
          @click="handleIconClick"
        >
          <v-icon color="red">mdi-exclamation</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-card-title
      class="justify-center text-center"
    >
      {{ itemName }}
    </v-card-title>

    <v-card-subtitle
      class="text-center"
    >
      {{ itemBase }} ({{ itemMaxSockets }})
    </v-card-subtitle>

    <v-card-actions class="justify-center">
      <v-list slim dense>
        <v-list-item
          v-for="(property, index) in itemPropertyStrings"
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
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUniqueViewerStore } from '@/stores/uniqueViewer';

const uniqueViewerStore = useUniqueViewerStore()
const { viewer: uniqueViewer } = storeToRefs(uniqueViewerStore)

// Use computed properties to access store values
const itemName = computed(() => uniqueViewer.value.itemName)
const itemBase = computed(() => uniqueViewer.value.itemBase)
const itemMaxSockets = computed(() => uniqueViewer.value.itemMaxSockets)
const itemPropertyStrings = computed(() => uniqueViewer.value.itemPropertyStrings)

const imageUrl = ref(null)

const handleIconClick = () => {
  // Implement your report functionality here
}

watchEffect(async () => {
  // Check if we have valid data in the store
  if (!itemName && !itemBase) return

  try {
    // Try to load image based on itemName first
    if (itemName) {
      const imageName = itemName.value.replaceAll(' ', '_')
      const imageModule = await import(`@/assets/items/${imageName}.png`).catch(() => null)
      if (imageModule) {
        imageUrl.value = imageModule.default
        return
      }
    }

    // Fallback to itemBase if itemName image doesn't exist
    if (itemBase.value) {
      const baseImageName = itemBase.value.replaceAll(' ', '_')
      const imageModule = await import(`@/assets/items/${baseImageName}.png`).catch(() => null)
      if (imageModule) {
        imageUrl.value = imageModule.default
        return
      }
    }

    // Final fallback to Topaz.png
    const topazModule = await import('@/assets/items/Gem_Chipped_Topaz.png')
    imageUrl.value = topazModule.default
  } catch (error) {
    console.error('Error loading image:', error)
    imageUrl.value = null
  }
})
</script>

<style scoped>
</style>

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
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              variant="text"
              class="position-absolute top-0 end-0 ma-2"
              style="z-index: 1;"
              v-bind="props"
            >
              <v-icon color="red">mdi-exclamation</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(reportType, index) in reportTypes"
              :key="index"
              @click="handleReportClick(reportType)"
            >
              <v-list-item-title>{{ reportType }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-card-title
      class="justify-center text-center"
    >
      {{ itemName }}
    </v-card-title>

    <v-row align="center" justify="center" class="align-center items-center">
      <v-col cols="auto" class="pr-0">
        <v-card-subtitle class="pa-0">{{ itemBaseName }}</v-card-subtitle>
      </v-col>
      <v-col cols="auto" class="pl-1 self-start">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-menu-down-outline"
              size="x-small"
              color="white"
              variant="text"
              density="compact"
              class="mt-n1"
            />
          </template>
          <v-list>
            <v-list-item
              v-for="base in sortedItemBases"
              :key="base"
              @click="selectBase(base)"
            >
              <v-list-item-title>{{ base }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-card-text>{{ itemRunes.map(rune => rune.split(' ')[0]).join(' + ') }}</v-card-text>
    </v-row>

    <v-divider class="mt-3 ml-10 mr-10"></v-divider>

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
import { ref, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { shuffleArray } from '@/util/util'
import { useRunewordViewerStore } from '@/stores/runewordViewer';

const runewordViewerStore = useRunewordViewerStore()
const { viewer: runewordViewer } = storeToRefs(runewordViewerStore)

// Use computed properties to access store values
const itemName = computed(() => runewordViewer.value.itemName)
const itemBases = computed(() => runewordViewer.value.itemBases)
const itemRunes = computed(() => runewordViewer.value.itemRunes)
const itemPropertyStrings = computed(() => runewordViewer.value.itemPropertyStrings)

// Computed property to get sorted bases alphabetically
const sortedItemBases = computed(() => {
  return [...itemBases.value].sort((a, b) => a.localeCompare(b))
})

// Report types
const reportTypes = [
  'Report Missing Stats',
  'Report Other'
]

const itemBaseName = ref('')
const imageUrl = ref(null)

const handleReportClick = (reportType) => {
  switch(reportType) {
    case 'Report Incorrect Stats':
      break
    case 'Report Other':
      break
  }
}

const selectBase = (base) => {
  itemBaseName.value = base

  // Optional: You might want to update the image or trigger some other action
  // when a new base is selected
  updateImageForBase(base)
}

const updateImageForBase = async (base) => {
  try {
    const baseImageName = base.replaceAll(' ', '_')
    const imageModule = await import(`@/assets/items/${baseImageName}.png`)
    imageUrl.value = imageModule.default
  } catch (error) {
    console.error('Error loading image for base:', base, error)
  }
}

watchEffect(async () => {
  // Check if we have valid data in the store
  if (!itemName.value && !itemBases.value) return

  try {
    // Try to load image based on itemName first
    if (itemName.value) {
      const imageName = itemName.value.replaceAll(' ', '_')
      try {
        const imageModule = await import(`@/assets/items/${imageName}.png`)
        imageUrl.value = imageModule.default
        return
      } catch {}
    }

    // If you have multiple bases (for runewords, for example)
    // We shuffle the array to get a random base each time
    const bases = shuffleArray(itemBases.value)
    for (const base of bases) {
      const baseImageName = base.replaceAll(' ', '_')
      try {
        const imageModule = await import(`@/assets/items/${baseImageName}.png`)
        imageUrl.value = imageModule.default
        itemBaseName.value = base
        return
      } catch {}
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

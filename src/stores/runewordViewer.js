import { defineStore } from 'pinia'

export const useRunewordViewerStore = defineStore('runewordViewer', {
  state: () => ({
    viewer: {
      itemName: '',
      itemType: '',
      itemBases: [],
      itemRunes: [],
      itemProperties: [],
      itemPropertyStrings: []
    }
  }),

  actions: {
    updateViewer(viewerData) {
      this.viewer = { ...viewerData }
    },

    clearViewer() {
      this.viewer = {
        itemName: '',
        itemType: '',
        itemBase: '',
        itemProperties: [],
        itemPropertyStrings: []
      }
    }
  }
})

import { defineStore } from 'pinia'

export const useUniqueViewerStore = defineStore('uniqueViewer', {
  state: () => ({
    viewer: {
      itemName: '',
      itemType: '',
      itemBase: '',
      itemMaxSockets: 0,
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
        itemMaxSockets: 0,
        itemProperties: [],
        itemPropertyStrings: []
      }
    }
  }
})

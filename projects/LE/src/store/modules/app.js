const app = {
  state: {
    center: [113.802454, 22.682169], // 地图中心
    markerTitle: '' // 地图marker标题
  },

  mutations: {
    SET_CENTER: (state, item) => {
      state.center = [item.longitude, item.latitude]
    },
    SET_MARKERTITLE: (state, content) => {
      state.markerTitle = content
    },
    SET_MAPINFOVISIBLE: (state, visible) => {
      state.mapInfoVisible = visible
    }
  }
}

export default app

const app = {
  state: {
    center: [113.802454, 22.682169], // 地图中心
    selectedNode: {}, // 被选中节点
    mapWindowShow: false // 地图信息框的显隐
  },

  mutations: {
    SET_CENTER: (state, item) => {
      state.center = [item.longitude, item.latitude]
    },
    SET_SELECTNNODE: (state, node) => {
      state.selectedNode = node
    },
    SET_MAPWINDOWSHOW: (state, status) => {
      state.mapWindowShow = status
    }
  }
}

export default app

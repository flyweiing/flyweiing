const app = {
  state: {
    center: [113.802454, 22.682169], // 地图中心
    selectedNode: {} // 被选中节点名称
  },

  mutations: {
    SET_CENTER: (state, item) => {
      state.center = [item.longitude, item.latitude]
    },
    SET_SELECTNNODE: (state, node) => {
      state.selectedNode = node
    }
  }
}

export default app

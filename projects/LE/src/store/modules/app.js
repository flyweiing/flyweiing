const app = {
  state: {
    center: [113.802454, 22.682169]
  },

  mutations: {
    SET_CENTER: (state, item) => {
      state.center = [item.longitude, item.latitude]
    }
  }
}

export default app

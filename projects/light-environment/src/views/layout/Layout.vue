<template>
  <div class="app-container">
    <app-header></app-header>
    <app-main></app-main>
  </div>
</template>

<script>
import { AppHeader, AppMain } from './components'
//
export default {
  name: 'layout',
  components: {
    AppHeader,
    AppMain
  }
//  computed: {
//    sidebar() {
//      return this.$store.state.app.sidebar
//    },
//    device() {
//      return this.$store.state.app.device
//    },
//    classObj() {
//      return {
//        hideSidebar: !this.sidebar.opened,
//        withoutAnimation: this.sidebar.withoutAnimation,
//        mobile: this.device === 'mobile'
//      }
//    }
//  },
//  methods: {
//    handleClickOutside() {
//      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
//    }
//  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    height: 100%;
    width: 100%;
    background-color: #101a23;
  }

</style>

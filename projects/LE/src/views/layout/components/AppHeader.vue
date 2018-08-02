<template>
  <div class="header">
    <div class="logo">
      <img class="logo-img" src="../../../assets/unilumin.png" alt="">
      <img src="../../../assets/system_name.png" alt="">
    </div>
    <ul class="nav">
      <router-link tag="li" to="/home">
        <img src="../../../assets/nav_home.png" alt="">
      </router-link>
      <router-link tag="li" to="/dashboard">
        <img src="../../../assets/nav_controller.png" alt="">
      </router-link>
      <router-link tag="li" to="/chart">
        <img src="../../../assets/nav_chart.png" alt="">
      </router-link>
      <router-link tag="li" to="/strategy">
        <img src="../../../assets/nav_strategy.png" alt="">
      </router-link>
      <router-link tag="li" to="/system">
        <img src="../../../assets/nav_system.png" alt="">
      </router-link>
    </ul>
    <div class="user-info">
      <div class="login-time">{{ loginTime }}</div>
      <div class="logout" @click="logout">注销</div>
      <svg-icon icon-class="user" />
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'AppHeader',
    data() {
      const myDate = new Date()
      const loginTime = myDate.getFullYear() + '年' + myDate.getMonth() + '月' + myDate.getDate() + '日'

      return {
        loginTime: loginTime
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }
</script>

<style lang="scss" scoped src="@/styles/header.scss"></style>


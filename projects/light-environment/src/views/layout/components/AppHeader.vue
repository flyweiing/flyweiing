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

<style rel="stylesheet/scss" lang="scss" scoped>
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 68px;
    background-image: url('../../../assets/bg_nav.png');
    background-size: 100% 100%;
    .logo {
      display: flex;
      align-items: center;
      position: absolute;
      height: 100%;
      left: 2%;
      .logo-img {
        margin-right: 12px;
      }
    }
    .nav {
      display: flex;
      position: absolute;
      top: -6px;
      left: 27%;
      color: #fff;
      list-style: none;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 125px;
        height: 51px;
        margin-left: 5px;
        transform: skew(-30deg);
        background: linear-gradient(#000a19, #3cacf5);
        cursor: pointer;
        img {
          transform: skew(30deg);
        }
      }
      li:hover,
      .router-link-active {
          width: 125px;
          border-left: 5px solid #4ec7ff;
          background: linear-gradient(right, #c564c0, #43a9f8);
      }
    }
    .user-info {
      display: flex;
      align-items: center;
      position: absolute;
      width: 18%;
      height: 100%;
      right: 0;
      font-size: 1rem;
      color: #fff;
      .login-time {
        margin-right: 10%;
      }
      .logout {
        margin-right: 6%;
        cursor: pointer;
      }
      .svg-icon {
        font-size: 24px;
      }
    }
  }
</style>


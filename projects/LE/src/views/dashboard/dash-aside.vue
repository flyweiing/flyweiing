<template>
  <div class="aside">
    <div class="search-input">
      <input type="text" placeholder="请输入内容">
      <button></button>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-dashboard"
      @open="handleOpen"
      @close="handleClose"
      text-color="#fff">
      <el-submenu index="1">
        <template slot="title">
          <span>福永总部路灯杆组</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">擎天灯柱</el-menu-item>
          <el-menu-item index="1-2">竖琴灯柱</el-menu-item>
          <el-menu-item index="1-3">斜塔灯柱</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>分组一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>分组二</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import { getAllNode } from '@/api/light'

  export default {
    name: 'AppAside',
    data() {
      return {
        list: null
      }
    },
    created() {
      this.getAllNode()
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      getAllNode() {
        getAllNode().then(response => {
          this.list = response.list
          console.log(this.list)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #022e4b;
  $bg-submenu: linear-gradient(right, #1b72b5, #2e9feb);
  $bg-active: linear-gradient(right, #9b3898, #3d83c7);

  /* reset element-ui css */
  .el-menu-dashboard {
    height: 89%;
    border-right: none;
    background-color: $bg;
    overflow-y: auto;
    .el-submenu {
      margin-bottom: 3px;
      background: $bg-submenu;
      .el-menu-item {
        border-left: 5px solid $bg;
        background-color: $bg;
      }
      .el-menu-item-group {
        background-color: $bg;
      }
      .el-submenu__title:hover {
        background: $bg-submenu;
      }
      .el-submenu__title i {
        color: #044972;
      }
    }
    .el-menu-item.is-active {
      border-left: 5px solid #00b7ee;
      color: #fff;
      background: $bg-active;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .aside {
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 0;
    width: 19%;
    padding: 17px 10px 17px 15px;
    background-image: url("../../assets/bg_silder.png");
    background-size: 100% 100%;
    overflow-y: hidden;
    z-index: 999;
    .search-input {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 35px;
      margin: 10px 0;
      input {
        width: 70%;
        padding-left: 11%;
        border: none;
        background-image: url("../../assets/search_input.png");
        background-size: 100% 100%;
      }
      button {
        width: 20%;
        border: none;
        background-image: url("../../assets/search.png");
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
</style>

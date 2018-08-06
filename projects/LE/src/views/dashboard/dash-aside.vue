<template>
  <div class="aside">
    <div class="search-input">
      <input type="text" placeholder="请输入内容">
      <button></button>
    </div>
    <ul class="header-title">
      <li class="name">灯杆名称</li>
      <li class="num">编号</li>
      <li class="status">状态</li>
    </ul>
    <el-menu
      default-active="2"
      class="el-menu-dashboard"
      @open="handleOpen"
      @close="handleClose"
      :uniqueOpened="true"
      text-color="#fff">
      <el-submenu
        v-for="(item, index) in list"
        :key="index"
        :index="'' + (index + 1)">
        <template slot="title">
          <span>{{ item.address }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(nodeItem, nodeIndex) in item.nodeList"
            :key="nodeIndex"
            :index="(index + 1) + '-' + (nodeIndex + 1)">{{ nodeItem.address }}</el-menu-item>
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
  $menu-left: #2e9feb;
  $menu-right: #1b72b5;
  $active-left: #3d83c7;
  $active-right: #9b3898;

  /* reset element-ui css */
  .el-menu-dashboard {
    height: 84%;
    border-right: none;
    background-color: $bg;
    overflow-y: auto;
    .el-submenu {
      margin-bottom: 3px;
      background: -webkit-linear-gradient(right, $menu-right, $menu-left);
      background: -moz-linear-gradient(right, $menu-right, $menu-left);
      background: -o-linear-gradient(right, $menu-right, $menu-left);
      background: linear-gradient(right, $menu-right, $menu-left);
      .el-menu {
        background-color: $bg;
      }
      .el-menu-item {
        height: 36px;
        line-height: 36px;
        margin-bottom: 3px;
        background-color: #025485;
        &:before{
          content: '';
          position: absolute;
          z-index: 3;
          left: 0;
          width:0;
          height:0;
          border-right: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid $bg;
          border-top: 6px solid $bg;
        }
      }
      .el-menu-item-group {
        background-color: $bg;
      }
      .el-submenu__title {
        height: 36px;
        line-height: 36px;
        &:hover {
          background: -webkit-linear-gradient(right, $menu-right, $menu-left);
          background: -moz-linear-gradient(right, $menu-right, $menu-left);
          background: -o-linear-gradient(right, $menu-right, $menu-left);
          background: linear-gradient(right, $menu-right, $menu-left);
        }
      }
      .el-submenu__title i {
        color: #044972;
      }
    }
    .el-menu-item.is-active {
      color: #fff;
      background: -webkit-linear-gradient(right, $active-right, $active-left);
      background: -moz-linear-gradient(right, $active-right, $active-left);
      background: -o-linear-gradient(right, $active-right, $active-left);
      background: linear-gradient(right, $active-right, $active-left);
      &:before{
        border: none;
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .aside {
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 0;
    width: 20%;
    padding: 1.6% 0.6% 1.6% 1.1%;
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
    .header-title {
      display: flex;
      list-style: none;
      width: 100%;
      height: 36px;
      line-height: 36px;
      margin: 0 0 3px 0;
      padding: 0;
      color: #fff;
      li {
        margin-right: 3px;
        text-align: center;
        background-color: #00699c;
        &:last-child {
          margin-right: 0;
        }
        &:before {
          content: '';
          position: absolute;
          z-index: 3;
          left: 0;
          width:0;
          height:0;
          border-right: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid #022e4b;
          border-top: 6px solid #022e4b;
        }
      }
      .name{
        width: 50%;
        &:before {
          left: 15px;
        }
      }
      .num {
        width: 30%;
        &:before {
          left: calc(53% - 6px);
        }
      }
      .status {
        width: 20%;
        &:before {
          left: calc(81% - 6px);
        }
      }
    }
  }
</style>

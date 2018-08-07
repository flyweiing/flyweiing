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
      :default-openeds="openeds"
      text-color="#fff">
      <el-submenu
        v-for="(item, index) in itemList"
        :key="index"
        :index="'' + (index + 1)">
        <template slot="title">
          <span>{{ item.address }}</span>
        </template>
        <el-menu-item-group v-if="item.nodeList.length > 0 ">
          <el-menu-item
            v-for="(nodeItem, nodeIndex) in item.nodeList"
            :key="nodeIndex"
            :index="(index + 1) + '-' + (nodeIndex + 1)">
            <span class="name">{{ nodeItem.address }}</span>
            <span class="num">编号:{{ nodeItem.code }}</span>
            <span v-if="nodeItem.isOnline == 1" class="on">在线</span>
            <span v-else="nodeItem.isOnline == 0" class="off">离线</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group v-else="item.nodeList.length === 0 ">
          <el-menu-item :index="(index + 1) + '-1'" disabled><span class="node-none">该网关下暂无节点</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'AppAside',
    props: {
      itemList: {
        type: Array
      }
    },
    data() {
      return {
        openeds: ['1']
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
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
      background: -webkit-linear-gradient(90deg, $menu-left, $menu-right);
      background: -moz-linear-gradient(90deg, $menu-left, $menu-right);
      background: -o-linear-gradient(90deg, $menu-left, $menu-right);
      background: linear-gradient(90deg, $menu-left, $menu-right);
      .el-menu {
        background-color: $bg;
      }
      .el-menu-item {
        height: 36px;
        line-height: 36px;
        margin-bottom: 3px;
        padding: 0 !important;
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
        &.is-active {
          color: #fff;
          background: -webkit-linear-gradient(90deg, $active-left, $active-right);
          background: -moz-linear-gradient(90deg, $active-left, $active-right);
          background: -o-linear-gradient(90deg, $active-left, $active-right);
          background: linear-gradient(90deg, $active-left, $active-right);
          &:before{
            border: none;
          }
        }
        span {
          display: inline-block;
          text-align: center;
        }
        .name {
          width: 50%;
        }
        .num {
          width: 30%;
        }
        .node-none {
          width: 100%;
        }
        .on {
          color: #67c23a;
        }
        .off {
          color: #f56c6c;
        }
      }
      .el-menu-item-group {
        background-color: $bg;
      }
      .el-submenu__title {
        height: 36px;
        line-height: 36px;
        &:hover {
          background: -webkit-linear-gradient(90deg, $menu-left, $menu-right);
          background: -moz-linear-gradient(90deg, $menu-left, $menu-right);
          background: -o-linear-gradient(90deg, $menu-left, $menu-right);
          background: linear-gradient(90deg, $menu-left, $menu-right);
        }
        i {
          display: inline-block;
          border-right: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid transparent;
          border-top: 6px solid $bg;
          color: #044972;
        }
        .el-icon-arrow-down:before {
          content: '';
        }
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
    z-index: 99;
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
      }
      .name{
        width: 50%;
      }
      .num {
        width: 30%;
      }
      .status {
        width: 20%;
      }
    }
  }
</style>

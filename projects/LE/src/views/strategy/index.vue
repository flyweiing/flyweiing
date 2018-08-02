<template>
  <div class="stragegy-container">
    <div class="stragegy-text">name:{{name}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Stragegy',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.stragegy {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

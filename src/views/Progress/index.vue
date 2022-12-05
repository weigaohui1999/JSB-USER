<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ProgressView extends Vue {
  //  data
  /* 加载 */
  public loading = false;
  /* 全部获取 */
  public finished = false;
  //  methods
  async onLoad() {
    console.log();
  }
}
</script>
<template>
  <div class="index-main">
    <div class="header">我的代办</div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="item" v-for="(item, index) in 32" :key="index">
          <div class="status">办结</div>
          <div class="info">
            <van-cell size="small" title="业务名称" value="业务名称内容" />
            <van-cell size="small" title="业务编码" value="业务编码内容" />
            <van-cell size="small" title="委托时间" value="业务名称内容" />
          </div>
          <!--           <div class="more">
            <van-icon name="arrow" />
          </div> -->
        </div>
      </van-list>
    </div>
  </div>
</template>
<style scoped lang="less">
.index-main {
  position: relative;
  .header {
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 48px;
    background-color: #fff;
    text-align: center;
    line-height: 48px;
    margin-bottom: 8px;
  }
  .main {
    min-height: calc(100vh - 120px);
    overflow: hidden;
    overflow: scroll;
    padding: 56px 12px 0;
    margin-bottom: 8px;
    .item {
      margin: 8px 0;
      display: flex;
      align-items: center;
      background-color: #fff;
      padding: 3px 6px;
      box-shadow: @shadow;
      .status {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-color: rgb(0, 179, 18);
        color: #fff;
      }
      .info {
        flex: 1;
      }
    }
  }
}
</style>

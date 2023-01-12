<template>
  <div class="graceful">
    <div
      class="tags"
      v-for="(v, i) in data"
      :key="i"
      @click="$router.push(`/guide?id=${v.id}`)"
    >
      <div class="view">
        <div class="view-item">
          <div class="label">事项:</div>
          <div class="view-title">
            {{ v.itemName }}
          </div>
        </div>
        <div class="view-item">
          <div class="label">承诺时间:</div>
          <div class="view-title">
            {{ v.promiseTime }}
          </div>
        </div>
      </div>
      <van-button round plain hairline :to="`/guide?id=${v.id}`"
        >详情</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GET_GUIDE_LIST } from "@/api/guide";
import router from "@/router";
@Component({
  methods: {
    router() {
      return router;
    },
  },
})
export default class Guide extends Vue {
  public data = [];

  private created() {
    this.getGuideList();
  }
  public async getGuideList() {
    const res = await GET_GUIDE_LIST();
    if (res && res.code == 200) {
      this.data = res.data;
    }
  }
}
</script>

<style scoped lang="less">
.graceful {
  background-color: #fff;
  margin-top: 12px;
  padding: 12px;
  border-radius: @radio;
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.31);
    letter-spacing: 3px;
  }
  .tags {
    box-sizing: border-box;
    margin: 8px 0;
    padding: 0 8px;
    height: 75px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:nth-of-type(odd) {
      background: #e9f3fa;
    }
    &:nth-of-type(even) {
      background: #faf5e9;
    }
    .view {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      padding: 10px 0;
      height: 100%;
      width: 70%;
      font-size: 14px !important;
      .view-item {
        display: flex;
        color: #999;
        .label {
          min-width: 68px;
          color: #000;
        }
      }
      .view-title {
        width: 224px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .van-button {
      height: 30px;
      line-height: 1;
      border: 1px solid #8abcef;
    }
  }
}
</style>

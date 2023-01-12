<template>
  <div class="index-main">
    <div class="header"></div>
    <div class="main">
      <van-divider :style="{ padding: '0 12px', fontSize: '16px' }">
        我的帮办
      </van-divider>
      <div class="card">
        <div class="model">
          <div
            class="item"
            @click="toPath(item.path)"
            v-for="(item, index) in data"
            :key="index"
            :style="`background-image: url(${item.bgi})`"
          >
            <p class="name">{{ item.name }}</p>
            <p class="desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
      <van-divider :style="{ padding: '0 12px', fontSize: '16px' }">
        帮办风采
      </van-divider>
      <guide />
    </div>
  </div>
</template>

<script lang="ts">
import Guide from "@/components/Guide/index.vue";
import { Component, Vue } from "vue-property-decorator";
import { MyItemModel } from "./type";
@Component({
  components: { Guide },
})
export default class HomeView extends Vue {
  public data: MyItemModel[] = [
    {
      name: "我要帮办",
      desc: "描述需求,专员办理",
      path: "/business",
      bgi: require("@/assets/bbqd.png"),
    },
    {
      name: "我的代办",
      desc: "我的办件,我知道",
      path: "/progress",
      bgi: require("@/assets/bbjd.png"),
    },
    {
      name: "我要评价",
      desc: "你的评价，我的动力",
      path: "",
      bgi: require("@/assets/bbjd.png"),
    },
    {
      name: "我要反馈",
      desc: "你的问题，我们改",
      path: "",
      bgi: require("@/assets/bbjd.png"),
    },
  ];

  public toPath(path: string) {
    this.$router.push(path);
  }
}
</script>

<style scoped lang="less">
.index-main {
  position: relative;
  .header {
    height: 160px;
    width: 100%;
    background-image: url("@/assets/banner.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .main {
    min-height: calc(100vh - 216px);
    padding: 8px 12px;
    .card {
      border-radius: @radio;
      background-color: #fff;
      /*       box-shadow: @shadow; */
      .model {
        padding: 12px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
          position: relative;
          margin-top: 12px;
          background-size: cover;
          background-repeat: no-repeat;
          width: 160px;
          height: 72px;
          font-size: 10px;
          color: #999;

          &:nth-child(1),
          &:nth-child(2) {
            margin-top: 0;
          }
          .name {
            color: #000;
            font-size: 14px;
            position: absolute;
            top: 8px;
            left: 8px;
          }
          .desc {
            position: absolute;
            bottom: 12px;
            left: 8px;
          }
        }
      }
    }
  }
}
</style>

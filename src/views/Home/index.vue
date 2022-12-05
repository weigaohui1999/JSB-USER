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
      <div class="graceful">
        <van-swipe :autoplay="3000" @change="toggleSwipe">
          <van-swipe-item v-for="(image, index) in swiperList" :key="index">
            <van-image style="width: 100%" height="200" :src="image" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ swiperCurrent + 1 }}/{{ swiperList.length }}
            </div>
          </template>
        </van-swipe>
        <div class="tags">
          <van-tag
            v-for="item in 3"
            :key="item"
            class="tag"
            size="medium"
            color="#ffe1e1"
            text-color="#ad0000"
            plain
          >
            标签
          </van-tag>
        </div>
        <div class="desc">
          在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GET_GUIDE_LIST } from "@/api/guide";
import { MyItemModel } from "./type";
@Component
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
  public group = 0;
  public swiperList: Array<string> = [
    "https://img01.yzcdn.cn/vant/apple-1.jpg",
    "https://img01.yzcdn.cn/vant/apple-2.jpg",
  ];
  public swiperCurrent = 0;

  public toPath(path: string) {
    this.$router.push(path);
  }
  public toggleSwipe(index: number) {
    this.swiperCurrent = index;
  }
  public async getGuideList() {
    const res = await GET_GUIDE_LIST();
    if (res && res.code == 200) {
      //  TODO
    }
  }
  private created() {
    this.getGuideList();
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
    .graceful {
      background-color: #fff;
      margin-top: 12px;
      padding: 8px;
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
        margin: 8px 0;
        .tag {
          margin-right: 6px;
        }
      }
      .desc {
        color: rgba(103, 103, 103, 1);
        letter-spacing: 1px;
        border-radius: @radio;
        background-color: #fff;
        padding: 0 5px 5px;
        font-size: 15px;
      }
    }
  }
}
</style>

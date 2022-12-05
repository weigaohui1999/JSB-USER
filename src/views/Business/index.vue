<template>
  <div class="index-main">
    <div class="card">
      <van-collapse accordion v-model="collKey" @change="view">
        <van-collapse-item
          is-link
          center
          :title="item.name"
          :name="item.id"
          :label="item.description"
          v-for="item in orgList"
          :key="item.id"
        >
          <template v-if="business.length">
            <van-cell
              :title="index + 1 + '.' + item.name"
              :label="'业务编码: ' + item.code"
              v-for="(item, index) in business"
              :key="item.id"
              @click="toPath(item.id)"
            />
          </template>
          <van-empty v-else description="暂无配置事项" />
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Storage from "@/libs/storage";
import { GET_DEPARTMENT_LIST } from "@/api/department";
import { GET_ITEM_LIST } from "@/api/item";
import { department_list, item_list } from "./type";
@Component
export default class BusinessView extends Vue {
  public collKey: number | null = null;

  public orgList: department_list[] = [];
  public business: item_list[] = [];

  public async view(id: number) {
    if (typeof id !== "number") return;
    const res = await GET_ITEM_LIST(id);
    if (res && res.code == 200) {
      this.business = res.data;
    }
  }
  public toPath(id: number) {
    Storage.set("itemId", id);
    this.$router.push("/commossion");
  }
  private async getDepartment() {
    const res = await GET_DEPARTMENT_LIST();
    if (res && res.code == 200) {
      this.orgList = res.data;
    }
  }

  private created() {
    this.getDepartment();
  }
}
</script>

<style scoped lang="less">
.index-main {
  position: relative;
  padding: 12px;
  .card {
    min-height: calc(100vh - 90px);
    background-color: #fff;
    border-radius: @radio;
    box-shadow: @shadow;
  }
}
</style>

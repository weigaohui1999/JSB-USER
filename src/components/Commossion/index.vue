<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

interface commossion {
  birthday: string;
  businessLimit: number;
  doThingNumber: number;
  goodAt: string;
  grade: number;
  headPicture: string | null;
  id: number;
  idCard: string;
  name: string | null;
  number: string;
  phone: string;
  sex: number;
}

@Component
export default class Commossion extends Vue {
  @Prop(Object) data!: commossion;
  @Prop(Number) comid!: number;

  @Emit("select")
  emitSelect() {
    return this.data.id;
  }
}
</script>

<template>
  <div class="Commossion" @click="emitSelect">
    <van-image class="avator" :src="data.headPicture" />
    <div class="info">
      <h3>{{ data.name }}</h3>
      <van-field
        label-width="30%"
        class="item-data"
        readonly
        :value="data.sex == 1 ? '男' : '女'"
        label="性别"
      />
      <van-field label-width="30%" class="item-data" label="评分">
        <template #input>
          <van-rate readonly :value="data.grade" />
        </template>
      </van-field>
      <van-field
        label-width="30%"
        class="item-data"
        readonly
        :value="data.doThingNumber + '件'"
        label="已办结"
      />
      <van-field
        label-width="30%"
        class="item-data"
        readonly
        :value="data.businessLimit + '件'"
        label="代办上限"
      />
      <div class="select" v-show="comid == data.id">
        <van-icon name="success" color="#ee0a24" size="32" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.Commossion {
  margin: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: @radio;
  padding: 8px;
  position: relative;
  .avator {
    border-radius: @radio;
    overflow: hidden;
    width: 130px;
    height: 160px;
  }
  .info {
    margin-left: 12px;
    flex: 1;
    .item-data {
      padding: 3px 0;
      font-size: 14px;
      color: rgba(153, 153, 153, 0.786);
    }
    .select {
      position: absolute;
      bottom: 10px;
      right: 12px;
    }
  }
}
</style>

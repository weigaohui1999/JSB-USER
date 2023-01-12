<template>
  <div class="app-container">
    <van-cell-group inset class="item">
      <van-cell title-class="title" :value="itemModel.name" title="业务名称" />
      <van-cell title-class="title" :value="itemModel.code" title="事项编码" />
      <van-cell
        title-class="title"
        :value="itemModel.description"
        title="描述"
      />
      <van-cell
        title-class="title"
        :value="itemModel.isCharge"
        title="是否收费"
      />
      <van-cell
        title-class="title"
        :value="itemModel.workObject"
        title="办事对象"
      />
      <van-cell
        title-class="title"
        :value="itemModel.itemType"
        title="事项类型"
      />
      <van-cell
        title-class="title"
        :value="itemModel.chargeDescription"
        title="收费说明"
      />
      <van-cell
        title-class="title"
        :value="itemModel.departmentId"
        title="部门"
      />
      <van-cell
        title-class="title"
        :value="itemModel.transactType"
        title="办理方式"
      />
    </van-cell-group>
    <van-cell-group inset class="item">
      <van-cell
        title-class="title"
        :value="commossionModels.name"
        title="姓名"
      />
      <van-cell
        title-class="title"
        :value="commossionModels.status"
        title="状态"
      />
      <van-cell
        title-class="title"
        :value="commossionModels.sex"
        title="性别"
      />
      <van-cell
        title-class="title"
        :value="commossionModels.sex"
        title="性别"
      />
      <van-cell
        title-class="title"
        :value="commossionModels.number"
        title="人员编号"
      />
      <van-cell
        title-class="title"
        :value="commossionModels.doThingNumber"
        title="办件数量"
      />
      <van-cell
        title-class="title"
        :value="commossionModels.businessLimit"
        title="业务上限"
      />
      <van-cell
        title-class="title"
        :value="commossionModels.departmentId"
        title="部门"
      />
      <van-cell
        title-class="title"
        :value="commossionModels.goodAt"
        title="擅长"
      />
      <van-cell
        title-class="title"
        :value="commossionModels.address"
        title="地址"
      />
      <van-cell
        title-class="title"
        :value="commossionModels.goodAt"
        title="擅长"
      />
    </van-cell-group>
    <van-cell-group inset class="item">
      <van-cell title-class="title" :value="guideModel.itemId" title="事项" />
      <van-cell
        title-class="title"
        :value="guideModel.promiseTime"
        title="承诺时间"
      />
      <van-cell
        title-class="title"
        :value="guideModel.officeAddress"
        title="办事地址"
      />
      <van-cell
        title-class="title"
        :value="guideModel.addressPhone"
        title="办事电话"
      />
      <van-cell
        title-class="title"
        :value="guideModel.approvalBasis"
        title="说明"
      />
      <van-cell
        title-class="title"
        :value="guideModel.processingTime"
        title="办理时间"
      />
      <van-cell
        title-class="title"
        :value="guideModel.guideQuestion"
        title="指南问题"
      />
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GET_GUIDE_DETAIL } from "@/api/guide";
import { commossionModels, guideModel, itemModel } from "./type";
@Component
export default class GuideView extends Vue {
  public commossionModels: commossionModels = {
    id: 0,
    birthday: "",
    sex: 0,
    grade: 0,
    number: "",
    doThingNumber: 0,
    businessLimit: 0,
    departmentId: 0,
    idCard: "",
    phone: "",
    goodAt: "",
    address: "",
    name: null,
    status: null,
    headPicture: null,
    token: null,
    password: null,
    department: null,
    account: null,
  };
  public guideModel: guideModel = {
    id: 0,
    itemId: 0,
    promiseTime: "",
    officeAddress: "",
    addressPhone: "",
    approvalBasis: "",
    processingTime: "",
    guideQuestion: null,
  };
  public itemModel: itemModel = {
    id: 0,
    name: "",
    code: "",
    description: "",
    isCharge: 0,
    workObject: 0,
    itemType: 0,
    chargeDescription: "",
    departmentId: 0,
    transactType: 0,
    materialsList: null,
    department: null,
  };
  private mounted() {
    this.getGuideList();
  }
  public async getGuideList() {
    const id = +this.$route.query.id;
    const res = await GET_GUIDE_DETAIL(id);
    if (res && res.code == 200) {
      this.commossionModels = res.data.commossionModels[0];
      this.guideModel = res.data.guideModel[0];
      this.itemModel = res.data.itemModel;
    }
  }
}
</script>

<style scoped lang="less">
.item {
  margin-top: 12px;
  .title {
    width: 30%;
    flex: none;
  }
  .label,
  .value {
    font-size: 13px;
    color: #1989fa;
  }
}
</style>

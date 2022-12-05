<script lang="ts">
import Commossion from "@/components/Commossion/index.vue";
import Upload from "@/components/Upload/index.vue";
import vueEsign from "vue-esign";

import { Component, Ref, Vue } from "vue-property-decorator";
import Storage from "@/libs/storage";
import Utils from "@/libs/utils";
import { GET_ITEM_DETAIL } from "@/api/item";
import { GET_COMMOSSION_LIST } from "@/api/commossion";
import { POST_SERVICE_ADD } from "@/api/serviceApply";
import { POST_DOCUMENT_SIGN } from "@/api/document";
import { item_details, params_type, commossion_type } from "./type";
@Component({
  components: { Commossion, Upload, vueEsign },
})
export default class CommossionView extends Vue {
  //refs
  @Ref() readonly esign!: any;
  //data
  public item: item_details = {
    chargeDescription: "",
    code: "",
    department: { description: "", id: null, name: "" },
    departmentId: 0,
    description: "",
    id: 0,
    isCharge: 0,
    itemType: 0,
    materialsList: [],
    name: "",
    transactType: 0,
    workObject: 0,
  };
  public params: params_type = {
    name: "123" || Storage.get("name"),
    phone: "123" || Storage.get("phone"),
    itemId: 12 || Storage.get("itemId"),
    idCard: "123" || Storage.get("idCard"),
    commissionId: null,
    type: null,
    company: "",
    address: "",
    status: null,
    materialsServiceApplyList: [],
  };
  public signUrl = "";
  public show = {
    commissionId: false,
    sign: false,
  };
  public dict = {
    commissionId: [] as Array<commossion_type>,
  };
  public comid: number | null = null;
  //  获取签名板需要的宽和高
  public clientWidth: number = document.body.clientWidth;
  public clientHeight: number = document.body.clientHeight;

  //computed
  get comName(): string {
    let name = "";
    for (let i = 0; i < this.dict.commissionId.length; i++) {
      if (this.dict.commissionId[i].id == this.comid) {
        name = this.dict.commissionId[i].name;
        break;
      }
    }
    return name;
  }
  //methods

  public setComid(id: number) {
    this.comid = id;
    this.params.commissionId = this.comid;
    this.show.commissionId = false;
  }
  //  提交签名画布
  public handleGenerate() {
    this.esign
      .generate()
      .then((res: any) => {
        //  旋转签名后的图片
        Utils.rotateBase64Img(res, -90, (url: string) => {
          this.signUrl = url;
          this.handleReset();
          this.show.sign = false;
        });
      })
      .catch(() => {
        this.$notify({ type: "warning", message: "签名获取失败！" });
      });
  }
  //  重制画布
  public handleReset() {
    this.esign.reset();
  }
  public async onSubmit() {
    if (this.signUrl == "") {
      this.$notify({ type: "warning", message: "电子签名获取失败！" });
      return;
    }
    //  提交业务申请
    let materialsServiceApplyList: Array<object> = [];
    this.params.materialsServiceApplyList.forEach((item) => {
      materialsServiceApplyList.push(...item);
    });

    const res = await POST_SERVICE_ADD({
      ...this.params,
      materialsServiceApplyList,
    });
    if (res && res.code == 200) {
      // 补充业务签名笔迹
      let signData = Utils.base64ToFile(
        this.signUrl,
        this.params.name + "的签名笔迹"
      );
      signData.append("number", res.data);
      const iSign = await POST_DOCUMENT_SIGN(signData);
      if (iSign && iSign.code == 200) {
        debugger;
      }
    }
  }
  private async getDetail() {
    const res = await GET_ITEM_DETAIL(Storage.get("itemId"));
    if (res && res.code == 200) {
      this.item = res.data;
      //初始化参数内材料列表
      this.params.materialsServiceApplyList = res.data.materialsList.map(
        (item: { id: any; itemId: any }) => {
          return [
            {
              materialsId: item.id,
              materialsLink: "",
              serviceApplyId: item.itemId,
            },
          ];
        }
      );
    }
  }
  private async getCommossion() {
    const res = await GET_COMMOSSION_LIST(Storage.get("itemId"));
    if (res && res.code == 200) {
      this.dict.commissionId = res.data;
    }
  }

  private created() {
    this.getDetail();
    this.getCommossion();
  }
}
</script>

<template>
  <div class="index-main">
    <van-tabs type="card" animated>
      <van-tab title="业务详情">
        <van-cell-group inset class="item">
          <van-cell title-class="title" :value="item.name" title="业务名称" />
          <van-cell title-class="title" :value="item.code" title="业务编码" />
          <van-cell
            title-class="title"
            :value="item.workObject"
            title="申报对象"
          />
          <van-cell
            title-class="title"
            :value="item.itemType"
            title="业务类型"
          />
          <van-cell
            title-class="title"
            :value="item.isCharge"
            title="是否收费"
          />
          <van-cell
            title-class="title"
            :value="item.transactType"
            title="办理方式"
          />
        </van-cell-group>
        <van-cell-group inset class="item">
          <van-cell
            title-class="title"
            :label="item.description"
            title="业务简介"
          />
          <van-cell
            title-class="title"
            :label="item.chargeDescription"
            title="收费描述"
          />
        </van-cell-group>
        <van-cell-group inset class="item">
          <van-cell
            title-class="title"
            :value="item.department.name"
            title="相关部门"
          />
          <van-cell
            title-class="title"
            :label="item.department.description"
            title="部门简介"
          />
        </van-cell-group>
        <van-cell-group inset class="item">
          <van-cell
            title-class="title"
            :value="item.materialsList.length + '项'"
            title="业务材料"
          />
          <van-cell
            center
            label-class="label"
            value-class="value"
            v-for="(it, index) in item.materialsList"
            :key="it.id"
            title=""
            value="下载模版"
            :label="index + 1 + '.' + it.name"
          />
        </van-cell-group>
      </van-tab>
      <van-tab title="委托申报">
        <van-form @submit="onSubmit">
          <van-cell-group inset class="item">
            <van-field
              v-model="params.name"
              :rules="[{ required: true, message: '请填写用户名' }]"
              placeholder="输入办理人姓名"
              readonly
              label="姓名"
            />
            <van-field
              v-model="params.phone"
              :rules="[{ required: true, message: '请填写手机号' }]"
              placeholder="输入办理人手机号"
              type="tel"
              readonly
              label="手机号"
            />
            <van-field
              v-model="params.idCard"
              :rules="[{ required: true, message: '请填写身份证' }]"
              placeholder="输入办理人身份证"
              readonly
              label="身份证"
            />
            <van-field
              readonly
              clickable
              :rules="[{ required: true, message: '请选择帮办员' }]"
              :value="comName"
              label="帮办员"
              placeholder="点击选择帮办员"
              @click="show.commissionId = true"
            />
            <van-field
              v-model="params.type"
              :rules="[{ required: true, message: '请选择办理类型' }]"
              label="办理类型"
            >
              <template #input>
                <van-radio-group v-model="params.type" direction="horizontal">
                  <van-radio name="1">个人提交</van-radio>
                  <van-radio name="2">法人提交</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              label="公司名称"
              v-if="params.type == 2"
              v-model="params.company"
              :rules="[{ required: true, message: '请输入办理人公司名称' }]"
              placeholder="输入办理人公司名称"
            />
            <van-field
              label="联系地址"
              v-model="params.address"
              placeholder="输入办理人联系地址"
            />
          </van-cell-group>
          <van-cell-group
            inset
            class="item"
            v-if="params.materialsServiceApplyList.length"
          >
            <Upload
              v-for="(it, index) in item.materialsList"
              :key="index"
              :name="index + 1 + '.' + it.name"
              :required="true"
              v-model="params.materialsServiceApplyList[index]"
            />
          </van-cell-group>

          <van-cell-group inset class="item">
            <van-cell title="委托签名">
              <template #label>
                <van-icon name="info-o" color="#1989fa" />
                <span> 点击画布开始签名！</span>
              </template>
            </van-cell>
            <van-image
              @click="show.sign = true"
              v-show="signUrl.length"
              class="isSign"
              :src="signUrl"
              :alt="params.name + '的签名笔迹'"
            />
            <div
              v-show="!signUrl.length"
              class="isSign"
              @click="show.sign = true"
            >
              <p>开始签名</p>
            </div>
          </van-cell-group>
          <van-cell-group inset style="margin-top: 8px">
            <van-button block type="info" native-type="submit" v-waves>
              提交
            </van-button>
          </van-cell-group>
        </van-form>
      </van-tab>
    </van-tabs>
    <van-popup
      v-model="show.commissionId"
      :style="{ height: '70%', overflow: 'hidden' }"
      position="bottom"
      round
      safe-area-inset-bottom
    >
      <van-nav-bar
        title="帮办员"
        left-text="取消"
        @click-left="show.commissionId = false"
        :border="false"
      />
      <div class="list">
        <Commossion
          v-for="(item, index) in dict.commissionId"
          :key="index"
          :data="item"
          :comid="comid"
          @select="setComid"
        />
      </div>
    </van-popup>
    <div class="esign" v-show="show.sign">
      <van-notice-bar class="tip" text="请锁定旋转后，在横屏模式下进行签名。" />
      <vue-esign
        ref="esign"
        :width="clientWidth"
        :height="clientHeight"
        :isCrop="true"
        :isClearBgColor="false"
        :lineWidth="6"
        lineColor="#000000"
        :bgColor="'#fff'"
      />
      <div class="btns">
        <van-button type="primary" @click="handleGenerate">提交</van-button>
        <van-button type="info" style="margin-top: 8px" @click="handleReset">
          恢复
        </van-button>
        <van-button
          type="warning"
          style="margin-top: 8px"
          @click="show.sign = false"
          >取消</van-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.index-main {
  position: relative;
  padding: 12px;
  min-height: calc(100vh - 90px);

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
    .isSign {
      display: block;
      margin: 8px;
      height: 120px;
      border-radius: @radio;
      background-color: #eee;
      line-height: 120px;
      text-align: center;
      color: @colorMain;
      font-size: 14px;
    }
  }
  .list {
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    background-color: #eee;
    padding-bottom: 2.75rem;
  }
  .esign {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .tip {
      position: absolute;
      width: 100%;
    }
    .btns {
      display: flex;
      flex-direction: column;
      position: absolute;
      transform: rotate(90deg);
      bottom: -1rem;
      right: 5rem;
    }
  }
}
</style>

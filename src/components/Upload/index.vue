<template>
  <div class="Upload">
    <van-field
      :label="name"
      :rules="[{ required: required, message: '请提交此项相关材料' }]"
      class="column"
    >
      <template #input>
        <van-uploader
          :max-count="limit"
          v-model="fileList"
          :after-read="afterRead"
        />
      </template>
    </van-field>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Model,
  Emit,
  Watch,
  Vue,
} from "vue-property-decorator";

import { POST_FILE_UPLOAD } from "@/api/file";
import { fileList, materials_type } from "./type";
@Component
export default class Upload extends Vue {
  //prop
  @Prop(String) name!: string;
  @Prop(Boolean) required!: boolean;
  @Prop({ default: 3, type: Number }) limit!: number;
  //Model
  @Model("update", { type: Array }) value!: Array<materials_type>;
  //emit
  @Emit("update")
  setData(list: Array<materials_type>): Array<materials_type> {
    return list;
  }
  //watch
  @Watch("fileList", { immediate: true, deep: true })
  fileListWatch(newV: any) {
    if (newV.length) {
      let data: Array<materials_type> = [];
      newV.forEach((item: any) => {
        if (item.status == "done") {
          data.push({ ...this.emitData, materialsLink: item.url });
        }
      });
      this.setData(data);
    } else {
      this.setData([]);
    }
  }

  //data
  public fileList: Array<fileList> = [];
  private emitData: any = {};
  //methods
  public afterRead(file: any) {
    file.status = "uploading";
    file.message = "上传中...";
    let formData = new FormData();
    formData.append("file", file.file);
    POST_FILE_UPLOAD(formData).then((res) => {
      if (res && res.code == 200) {
        file.status = "done";
        file.message = "完成";
        file.url = res.data;
      } else {
        file.status = "failed";
        file.message = "上传失败";
      }
    });
  }

  private created() {
    // 业务数据提交额外携带参数
    this.emitData = {
      materialsId: this.value[0].materialsId,
      serviceApplyId: this.value[0].serviceApplyId,
    };
  }
}
</script>

<style scoped lang="less">
.Upload {
  position: relative;
  .column {
    display: block;
  }
}
</style>

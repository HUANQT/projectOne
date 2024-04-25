<template>
  <!-- 问卷调查数据列表 -->
  <div class="ml-4">
    <!-- 按钮 -->
    <el-row>
      <!-- 刷新 -->
      <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]" @click="searchUser">
        <div class="flex justify-around">
          <Icon icon="eva:search-fill" />
          <span>刷新</span>
        </div>
      </el-button>
    </el-row>
    <!-- 导出 -->
    <div class="h-[60px] flex items-center">
      <el-button type="danger">
        <div class="flex justify-around"><Icon icon="mingcute:add-fill" /><span>导出</span></div>
      </el-button>
    </div>
    <!-- 新增-->
    <div
      v-show="showMask"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    ></div>
    <!-- 表格 -->
    <el-table
      :data="SurveyslistAllCop"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="sex" label="会员ID"></el-table-column>
      <el-table-column prop="deptName" label="昵称"> </el-table-column>
      <el-table-column prop="symptom" label="时间"> </el-table-column>
      <el-table-column prop="" label="操作">
        <template v-slot="scope">
          <el-button type="text">
            <div class="flex" @click="showMask = true">
              <Icon icon="solar:pen-2-bold" /><span>数据</span>
            </div>
          </el-button>
          <el-button type="text">
            <div class="flex" @click="deleteuserlit(scope.row.id)">
              <Icon icon="pajamas:remove" /><span>删除</span>
            </div>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Surveyslist } from '@/service';

const { log } = console;
export default {
  async created() {
    const getSurveyslist = await Surveyslist();
    this.SurveyslistAll = getSurveyslist.data.data.result;
    this.SurveyslistAllCop = this.SurveyslistAll;
    log('问卷调查列表', this.SurveyslistAllCop);
  },
  data() {
    return {
      ExpertName: '',
      DoctorCode: '',
      Department: '',
      showMask: false,
      // 问卷调查列表
      SurveyslistAll: [],
      SurveyslistAllCop: [],
    };
  },
  methods: {
    // 搜索
    searchUser() {},
    // 重置
    reset() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

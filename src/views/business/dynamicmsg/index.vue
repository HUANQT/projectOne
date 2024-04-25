<template>
  <!-- 专家管理 -->
  <div class="ml-4">
    <!-- 搜索 -->
    <div class="h-[100px] flex items-center">
      <!-- 专家名称 -->
      <div class="flex items-center">
        <div class="w-40 text-[18px] text-[#909399] font-bold mr-[5px]">专家名称</div>
        <el-input v-model="ExpertName"></el-input>
      </div>
      <!-- 医生代码 -->
      <div class="flex items-center ml-2">
        <div class="w-40 text-[18px] text-[#909399] font-bold mr-[5px]">医生代码</div>
        <el-input v-model="DoctorCode"></el-input>
      </div>
      <!-- 科室 -->
      <div class="flex items-center ml-2">
        <div class="w-40 text-[18px] text-[#909399] font-bold mr-[5px]">科室</div>
        <el-input v-model="Department"></el-input>
      </div>
      <!-- 按钮 -->
      <el-row class="ml-4">
        <!-- 搜索 -->
        <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]" @click="searchUser">
          <div class="flex justify-around">
            <Icon icon="eva:search-fill" />
            <span>搜索</span>
          </div>
        </el-button>
        <!-- 重置 -->
        <el-button class="w-[92px]" @click="reset"
          ><div class="flex justify-around">
            <Icon icon="system-uicons:reset-alt" />
            <span>重置</span>
          </div></el-button
        >
      </el-row>
    </div>
    <!-- 新增 -->
    <div class="h-[60px] flex items-center">
      <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]" @click="showMask = true">
        <div class="flex justify-around"><Icon icon="mingcute:add-fill" /><span>新增</span></div>
      </el-button>
    </div>
    <!-- 新增蒙版 -->
    <div
      v-show="showMask"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div class="bg-white w-[750px] rounded-[10px] p-[24px]">
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">添加</div>
          <div @click="showMask = false">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 专家名称 -->
        <div class="h-[47px] mt-[50px] flex items-center">
          <span class="text-[18px] text-[#909399] font-bold">专家名称</span>
          <el-input v-model="inputName" placeholder="请输入内容" class="w-[600px] ml-4"></el-input>
        </div>
        <!-- 职称 -->
        <div class="flex mt-[28px] items-center ml-9">
          <span class="text-[18px] text-[#909399] font-bold">职称</span>
          <el-input
            v-model="inputskilled"
            placeholder="请输入内容"
            class="w-[600px] ml-4"
          ></el-input>
        </div>
        <!-- 医生代码 -->
        <div class="flex mt-[28px] items-center">
          <span class="text-[18px] text-[#909399] font-bold">医生代码</span>
          <el-input
            v-model="inputdoctorCode"
            placeholder="请输入内容"
            class="w-[600px] ml-4"
          ></el-input>
        </div>
        <!-- 擅长 -->
        <div class="flex mt-[28px] items-center ml-9">
          <span class="text-[18px] text-[#909399] font-bold">擅长</span>
          <el-input
            v-model="inputProficient"
            placeholder="请输入内容"
            class="w-[600px] ml-4"
          ></el-input>
        </div>
        <div class="flex mt-[28px] items-center ml-6">
          <span class="text-[18px] text-[#909399] font-bold">排序ID</span>
          <el-input-number v-model="num" class="ml-4" :min="1" :max="1000"></el-input-number>
        </div>
        <!-- 头像 -->
        <div class="flex mt-[28px]">
          <span class="text-[18px] text-[#909399] font-bold ml-9">头像</span>
          <el-upload
            class="avatar-uploader ml-4"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 科室 -->
        <div class="flex items-center mt-[28px]">
          <span class="text-[18px] text-[#909399] font-bold ml-9">科室</span>
          <el-select v-model="value" placeholder="请选择" class="w-[200px] ml-4">
            <el-option
              v-for="item in DeptalllistAll"
              :key="item.value"
              :label="item.label"
              :value="item.deptName"
            >
              <span style="float: left">{{ item.deptName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
          </el-select>
        </div>
        <div class="flex items-center mt-[28px]">
          <span class="text-[18px] text-[#909399] font-bold ml-9">简介</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
            class="ml-4"
          >
          </el-input>
        </div>
        <!-- 确定取消 -->
        <div class="mt-[76px] pl-[540px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="addDept()">确定</el-button>
            <el-button @click="showMask = false">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 编辑 -->
    <div
      v-show="showmbxg"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div class="bg-white w-[750px] rounded-[10px] p-[24px]">
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">添加</div>
          <div @click="showmbxg = false">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 专家名称 -->
        <div class="h-[47px] mt-[50px] flex items-center">
          <span class="text-[18px] text-[#909399] font-bold">专家名称</span>
          <el-input v-model="inputName" placeholder="请输入内容" class="w-[600px] ml-4"></el-input>
        </div>
        <!-- 职称 -->
        <div class="flex mt-[28px] items-center ml-9">
          <span class="text-[18px] text-[#909399] font-bold">职称</span>
          <el-input
            v-model="inputskilled"
            placeholder="请输入内容"
            class="w-[600px] ml-4"
          ></el-input>
        </div>
        <!-- 医生代码 -->
        <div class="flex mt-[28px] items-center">
          <span class="text-[18px] text-[#909399] font-bold">医生代码</span>
          <el-input
            v-model="inputdoctorCode"
            placeholder="请输入内容"
            class="w-[600px] ml-4"
          ></el-input>
        </div>
        <!-- 擅长 -->
        <div class="flex mt-[28px] items-center ml-9">
          <span class="text-[18px] text-[#909399] font-bold">擅长</span>
          <el-input
            v-model="inputProficient"
            placeholder="请输入内容"
            class="w-[600px] ml-4"
          ></el-input>
        </div>
        <div class="flex mt-[28px] items-center ml-6">
          <span class="text-[18px] text-[#909399] font-bold">排序ID</span>
          <el-input-number v-model="num" class="ml-4" :min="1" :max="1000"></el-input-number>
        </div>
        <!-- 头像 -->
        <div class="flex mt-[28px]">
          <span class="text-[18px] text-[#909399] font-bold ml-9">头像</span>
          <el-upload
            class="avatar-uploader ml-4"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 科室 -->
        <div class="flex items-center mt-[28px]">
          <span class="text-[18px] text-[#909399] font-bold ml-9">科室</span>
          <el-select v-model="value" placeholder="请选择" class="w-[200px] ml-4">
            <el-option
              v-for="item in DeptalllistAll"
              :key="item.value"
              :label="item.label"
              :value="item.deptName"
            >
              <span style="float: left">{{ item.deptName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
          </el-select>
        </div>
        <div class="flex items-center mt-[28px]">
          <span class="text-[18px] text-[#909399] font-bold ml-9">简介</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
            class="ml-4"
          >
          </el-input>
        </div>
        <!-- 确定取消 -->
        <div class="mt-[76px] pl-[540px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="addDeptPut()">确定</el-button>
            <el-button @click="showmbxg = false">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="DoctorlistAllCop"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="doctorName" label="专家名称"></el-table-column>
      <el-table-column prop="introduction" label="职称"> </el-table-column>
      <el-table-column prop="doctorCode" label="医生代码"> </el-table-column>
      <el-table-column prop="orderNum" label="排序ID"> </el-table-column>
      <el-table-column prop="images" label="头像">
        <template>
          <img :src="images" />
        </template>
      </el-table-column>
      <el-table-column prop="skilled" label="科室"> </el-table-column>
      <el-table-column prop="" label="操作">
        <template v-slot="scope">
          <el-button type="text">
            <div class="flex" @click="showmbxg = true">
              <Icon icon="solar:pen-2-bold" /><span>编辑</span>
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
import {
  //
  Doctorlist,
  DoctorPost,
  Doctordelete,
  Deptalllist,
  DoctorPut,
} from '@/service';

const { log } = console;
export default {
  async created() {
    // 医生评价
    const getDoctorlist = await Doctorlist();
    this.DoctorlistAll = getDoctorlist.data.data.result;
    this.DoctorlistAllCop = this.DoctorlistAll;
    log('医生评价', this.DoctorlistAllCop);

    // 科室管理
    const getDeptalllist = await Deptalllist();
    this.DeptalllistAll = getDeptalllist.data.data;
    log('科室管理', this.DeptalllistAll);
  },
  data() {
    return {
      ExpertName: '',
      DoctorCode: '',
      Department: '',
      showMask: false,
      showmbxg: false,
      // 医生评价
      DoctorlistAll: [],
      DoctorlistAllCop: [],
      // 科室管理
      DeptalllistAll: [],
      value: '',
      // 专家名称
      inputName: '',
      // 职称
      inputskilled: '',
      // 医生代码
      inputdoctorCode: '',
      // 擅长
      inputProficient: '',
      // 头像
      imageUrl: '',
      num: '1',
      // 简介
      textarea: '',
      // 头像路径
      images: '',
    };
  },
  methods: {
    // 搜索
    searchUser() {
      // const filteredRows = this.DoctorlistAll.filter((row) => {
      //   row.doctorName.includes(this.ExpertName.trim());
      // });
      // log('搜索信息', filteredRows);
      // this.DoctorlistAllCop = filteredRows;
      // const filteredRows = this.DoctorlistAll.filter((row) => {
      //   row.doctorCode.includes(this.DoctorCode.trim());
      // });
      // log('搜索信息', filteredRows);
      // this.DoctorlistAllCop = filteredRows;
    },
    // 重置
    reset() {
      this.DoctorlistAllCop = this.DoctorlistAll;
    },
    // 图像上传
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
    // 增加确定
    async addDept() {
      await DoctorPost({
        id: 0,
        doctorName: this.inputName,
        introduction: this.inputskilled,
        title: this.textarea,
        skilled: this.value,
        images: '123',
        deptid: 0,
        orderNum: this.num,
        doctorCode: this.inputdoctorCode,
      });
      window.location.reload();
    },
    // 编辑
    async addDeptPut() {
      await DoctorPut({
        id: 0,
        doctorName: this.inputName,
        introduction: this.inputskilled,
        title: '精神疾病',
        skilled: this.value,
        images: '123',
        deptid: 0,
        orderNum: this.num,
        doctorCode: this.inputdoctorCode,
      });
    },
    // 删除
    async deleteuserlit(id) {
      await Doctordelete(id);
      window.location.reload();
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

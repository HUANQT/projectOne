<template>
  <!-- 科室管理 -->
  <div class="mx-4 mt-2">
    <!-- 搜索 -->
    <div class="h-[100px] flex items-center">
      <!-- 科室代码 -->
      <div class="flex items-center justify-between">
        <div class="w-40 text-[18px] text-[#909399] font-bold mr-[5px]">科室代码</div>
        <el-input v-model="DepartmentCode"></el-input>
      </div>
      <!-- 科室名称 -->
      <div class="flex items-center justify-between ml-4">
        <div class="w-40 text-[18px] text-[#909399] font-bold mr-[5px]">科室名称</div>
        <el-input v-model="DepartmentManagement"></el-input>
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
    <div class="h-[60px] flex justify-between items-center">
      <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]" @click="showMask = true">
        <div class="flex justify-around"><Icon icon="mingcute:add-fill" /><span>新增</span></div>
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="DeptalllistIdAllCop"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="deptCode" label="科室代码" width="180"></el-table-column>
      <el-table-column prop="deptName" label="科室名称" width="180"> </el-table-column>
      <el-table-column prop="position" label="科室位置" width="180"> </el-table-column>
      <el-table-column prop="orderNum" label="排序ID" width="180"> </el-table-column>
      <el-table-column prop="deptType" label="科室类型" width="180"> </el-table-column>
      <el-table-column prop="" label="操作" width="180">
        <template v-slot="scope">
          <el-button type="text">
            <div class="flex" @click="showmbxg(scope.row.id)">
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
    <!-- 新增 -->
    <div
      v-show="showMask"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white w-[750px] h-[512px] rounded-[10px] p-[24px]">
        <!-- 标题 -->
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">添加</div>
          <!-- 退出 -->
          <div @click="showMask = false">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 科室代码 -->
        <div class="flex items-center justify-between">
          <div class="text-[18px] text-[#909399] font-bold">科室代码</div>
          <el-input class="w-[85%]" v-model="NewDepartmentCode"></el-input>
        </div>
        <!-- 科室名称 -->
        <div class="flex items-center justify-between mt-4">
          <div class="text-[18px] text-[#909399] font-bold">科室名称</div>
          <el-input class="w-[85%]" v-model="NewDepartmentManagement"></el-input>
        </div>
        <!-- 排序 -->
        <div class="flex items-center mt-4">
          <div class="text-[18px] text-[#909399] font-bold mr-4">排序ID</div>
          <el-input-number v-model="num" :min="1" :max="10000" label="排序ID"></el-input-number>
        </div>
        <!-- 科室类型 -->
        <div class="mt-4">
          <span class="text-[18px] text-[#909399] font-bold mr-4">科室类型</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!-- 科室介绍 -->
        <div class="mt-4">
          <span class="text-[18px] text-[#909399] font-bold mr-4">科室介绍</span>
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea1">
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
      v-show="showMaskEdit"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white w-[750px] h-[512px] rounded-[10px] p-[24px]">
        <!-- 标题 -->
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">添加</div>
          <!-- 退出 -->
          <div @click="showMaskEdit = false">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 科室代码 -->
        <div class="flex items-center justify-between">
          <div class="text-[18px] text-[#909399] font-bold">科室代码</div>
          <el-input class="w-[85%]" v-model="NewDepartmentCode"></el-input>
        </div>
        <!-- 科室名称 -->
        <div class="flex items-center justify-between mt-4">
          <div class="text-[18px] text-[#909399] font-bold">科室名称</div>
          <el-input class="w-[85%]" v-model="NewDepartmentManagement"></el-input>
        </div>
        <!-- 排序 -->
        <div class="flex items-center mt-4">
          <div class="text-[18px] text-[#909399] font-bold mr-4">排序ID</div>
          <el-input-number v-model="num" :min="1" :max="10000" label="排序ID"></el-input-number>
        </div>
        <!-- 科室类型 -->
        <div class="mt-4">
          <span class="text-[18px] text-[#909399] font-bold mr-4">科室类型</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!-- 科室介绍 -->
        <div class="mt-4">
          <span class="text-[18px] text-[#909399] font-bold mr-4">科室介绍</span>
          <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea1">
          </el-input>
        </div>
        <!-- 确定取消 -->
        <div class="mt-[76px] pl-[540px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="addDeptEdit()">确定</el-button>
            <el-button @click="showMaskEdit = false">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  //
  Deptalllist,
  Deptlist,
  DeptallNew,
  DeptdeleteId,
  DeptallEdit,
} from '@/service';

const { log } = console;

export default {
  async created() {
    const getDeptalllist = await Deptalllist();
    this.DeptalllistAll = getDeptalllist.data.data;
    log('科室管理列表(下拉)', this.DeptalllistAll);
    const getDeptalllistId = await Deptlist();
    this.DeptalllistIdAll = getDeptalllistId.data.data.result;
    this.DeptalllistIdAllCop = this.DeptalllistIdAll;
    log('科室管理列表', this.DeptalllistIdAllCop);
  },

  data() {
    return {
      // 科室代码
      DepartmentCode: '',
      // 科室管理
      DepartmentManagement: '',
      // 新增科室代码
      NewDepartmentCode: '',
      // 新增科室管理
      NewDepartmentManagement: '',
      // 排序
      num: '',
      // 科室类型
      options: [
        {
          value: 1,
          label: '普通',
        },
        {
          value: 2,
          label: '重点',
        },
      ],
      value: '',
      // 科室介绍
      textarea1: '',
      // 科室管理列表(下拉)
      DeptalllistAll: [],
      // 科室管理列表
      DeptalllistIdAll: [],
      DeptalllistIdAllCop: [],
      showMask: false,
      showMaskEdit: false,
      id: '',
    };
  },
  methods: {
    // 搜索
    searchUser() {
      // // 科室代码
      // log(this.DepartmentCode);
      // // 科室管理
      // log(this.DepartmentManagement);
      if (this.DepartmentCode !== '') {
        const filteredRows = this.DeptalllistIdAll.filter((row) =>
          row.deptCode.includes(this.DepartmentCode.trim())
        );
        log(filteredRows);
        this.DeptalllistIdAllCop = filteredRows;
      } else if (this.DepartmentManagement !== '') {
        const filteredRows = this.DeptalllistIdAll.filter((row) =>
          row.deptName.includes(this.DepartmentManagement.trim())
        );
        log(filteredRows);
        this.DeptalllistIdAllCop = filteredRows;
      }
    },
    // 重置
    reset() {
      this.DepartmentCode = '';
      this.DepartmentManagement = '';
      this.DeptalllistIdAllCop = this.DeptalllistIdAll;
    },
    // 新增
    async addDept() {
      // // 新增科室代码
      // log(this.NewDepartmentCode);
      // // 新增科室管理
      // log(this.NewDepartmentManagement);
      // // 排序
      // log(this.num);
      // // 科室介绍
      // log(this.textarea);
      const getDeptallNew = await DeptallNew({
        id: 0,
        deptCode: this.NewDepartmentCode,
        deptName: this.NewDepartmentManagement,
        introduction: '',
        position: '覃涛',
        deptType: this.value,
        orderNum: this.num,
        imgUrl: '',
      });
      log(getDeptallNew);
    },

    // 编辑
    showmbxg(id) {
      this.showMaskEdit = true;
      this.id = id;
    },
    async addDeptEdit() {
      log(this.id);
      const getDeptallEdit = await DeptallEdit({
        id: this.id,
        deptCode: this.NewDepartmentCode,
        deptName: this.NewDepartmentManagement,
        introduction: '',
        position: '覃涛',
        deptType: this.value,
        orderNum: this.num,
        imgUrl: '',
      });
      log(getDeptallEdit);
    },

    // 删除
    async deleteuserlit(id) {
      const getDeptdeleteId = await DeptdeleteId(id);
      log(getDeptdeleteId);
    },
  },
};
</script>

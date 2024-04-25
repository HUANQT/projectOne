<template>
  <!-- 症状管理 -->
  <div class="mt-4 ml-4">
    <!-- 搜索 -->
    <div class="h-[100px] flex items-center">
      <!-- 症状管理 -->
      <div class="flex items-center justify-between">
        <div class="w-40 text-[18px] text-[#909399] font-bold mr-[5px]">症状</div>
        <el-input v-model="cardNumber"></el-input>
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
      <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]" @click="showMask = true">
        <div class="flex justify-around"><Icon icon="mingcute:add-fill" /><span>修改</span></div>
      </el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="SymptomslistAllCop"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="sex" label="适用性别"></el-table-column>
      <el-table-column prop="deptName" label="身体部位"> </el-table-column>
      <el-table-column prop="symptom" label="症状"> </el-table-column>
      <el-table-column prop="" label="操作">
        <template v-slot="scope">
          <el-button type="text">
            <div class="flex" @click="symptoms(scope.row.id)">
              <Icon icon="solar:pen-2-bold" /><span>编辑伴随症状管理</span>
            </div>
          </el-button>
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
  </div>
</template>
<script>
import {
  // 症状列表
  Symptomslist,
  // 伴随症状列表
  Concomitants,
} from '@/service';

const { log } = console;
export default {
  async created() {
    const getSymptomslist = await Symptomslist();
    this.SymptomslistAll = getSymptomslist.data.data.result;
    this.SymptomslistAllCop = this.SymptomslistAll;
    log('症状列表', this.SymptomslistAll);
  },
  data() {
    return {
      // 卡号
      cardNumber: '',
      // 症状列表
      SymptomslistAll: [],
      SymptomslistAllCop: [],
      sexAll: ['全部', '男', '女'],
    };
  },
  methods: {
    // 搜索
    searchUser() {
      log(123);
    },
    // 重置
    reset() {
      log(123);
    },
    //
    async symptoms(id) {
      log(id);
      const getConcomitants = await Concomitants(id);
      log(getConcomitants);
    },
  },
};
</script>

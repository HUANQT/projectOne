<template>
  <!-- 接诊卡管理 -->
  <div class="mt-4 ml-4">
    <!-- 搜索 -->
    <div class="h-[100px] flex items-center">
      <!-- 卡号 -->
      <div class="flex items-center justify-between">
        <div class="w-40 text-[18px] text-[#909399] font-bold mr-[5px]">卡号</div>
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
    <div class="h-[60px] flex justify-between items-center">
      <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]" @click="showMask = true">
        <div class="flex justify-around"><Icon icon="mingcute:add-fill" /><span>解绑</span></div>
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
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="deptCode" label="卡号"></el-table-column>
      <el-table-column prop="deptName" label="卡类型"> </el-table-column>
      <el-table-column prop="position" label="用户ID"> </el-table-column>
      <el-table-column prop="orderNum" label="绑定卡时间"> </el-table-column>
      <el-table-column prop="" label="操作">
        <template v-slot="scope">
          <el-button type="text">
            <div class="flex" @click="showmbxg(scope.row.id)">
              <Icon icon="solar:pen-2-bold" /><span>编辑</span>
            </div>
          </el-button>
          <el-button type="text">
            <div class="flex" @click="deleteuserlit(scope.row.id)">
              <Icon icon="pajamas:remove" /><span>解绑</span>
            </div>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { BodyCardslist } from '@/service';

const { log } = console;
export default {
  async created() {
    const getBodyCardslist = await BodyCardslist();
    log(getBodyCardslist);
  },
  data() {
    return {
      // 卡号
      cardNumber: '',
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
  },
};
</script>

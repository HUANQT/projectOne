<template>
  <!-- 订单明细 -->
  <div class="mx-4 mt-2">
    <!-- 搜索 -->
    <div class="h-[100px] flex items-center">
      <!-- 微信订单号 -->
      <div class="flex items-center justify-between">
        <div class="w-40 text-[18px] text-[#909399] font-bold mr-[5px]">微信订单号</div>
        <el-input v-model="WeChatOrderNumber"></el-input>
      </div>
      <!-- 订单号 -->
      <div class="flex items-center justify-between ml-4">
        <div class="w-20 text-[18px] text-[#909399] font-bold mr-[5px]">订单号</div>
        <el-input v-model="OrderNumber"></el-input>
      </div>
      <!-- 订单类型 -->
      <div class="flex items-center justify-between ml-4">
        <div class="text-[18px] text-[#909399] font-bold mr-[10px]">订单类型</div>
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
    </div>
    <div class="flex">
      <!-- 日期 -->
      <div class="ml-4">
        <div class="flex items-center">
          <div class="w-[100px] text-[18px] text-[#909399] font-bold mr-[10px]">创建时间</div>
          <el-date-picker
            v-model="valueDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
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
    <!-- 导出 -->
    <div class="mt-2">
      <el-button>
        <div class="flex"><Icon icon="pajamas:remove" /><span>导出</span></div>
      </el-button>
    </div>
    <!-- 表格 -->
    <!-- <el-table
      ref="multipleTable"
      :data="role"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange22"
      border
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="userId" label="用户id" width="120"> </el-table-column>
      <el-table-column prop="deptName" label="用户账号" width="120"> </el-table-column>
      <el-table-column prop="userName" label="用户昵称" width="120"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="120"> </el-table-column>
      <el-table-column prop="status" label="状态" width="120"></el-table-column>
    </el-table> -->
  </div>
</template>
<script>
import {
  // 订单明细列表
  payOrderlist,
  payOrderId,
} from '@/service';

const { log } = console;

export default {
  async created() {
    // 订单明细列表
    const getpayOrderlist = await payOrderlist();
    log(getpayOrderlist);
    const getpayOrderId = await payOrderId(1);
    log(getpayOrderId);
  },
  data() {
    return {
      // 微信订单号
      WeChatOrderNumber: '',
      // 订单号
      OrderNumber: '',
      // 状态
      value: '',
      // 日期
      valueDate: '',
      options: [
        { value: 1, label: '正常' },
        { value: 2, label: '停用' },
      ],
    };
  },
  methods: {
    // 搜索
    searchUser() {},
    // 重置
    reset() {
      log(456);
    },
    dakaimb() {
      log(789);
    },
  },
};
</script>

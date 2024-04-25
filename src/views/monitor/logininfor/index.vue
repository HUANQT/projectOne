<template>
  <!-- 登录日志 -->
  <div class="mt-4 ml-4">
    <!-- 登录日志管理搜索框 -->
    <div class="flex">
      <!-- 登录日志搜索 -->
      <div class="items-center flex justify-between">
        <div class="text-[#6a6766]">登录地址</div>
        <el-input
          class="w-[13vw] mx-[1vw]"
          placeholder="请输入登录地址"
          prefix-icon="el-icon-search"
          v-model="inputLoginAddress"
        >
        </el-input>
      </div>
      <!-- 登录日志搜索 -->
      <div class="items-center flex justify-between">
        <div class="text-[#6a6766]">角色名称</div>
        <el-input
          class="w-[13vw] mx-[1vw]"
          placeholder="请输入角色名称"
          prefix-icon="el-icon-search"
          v-model="inputNameSearch"
        >
        </el-input>
      </div>
      <!-- 登录日志状态 -->
      <div class="items-center flex justify-between">
        <span>状态</span>
        <el-select
          v-model="inputLoginStatus"
          placeholder="登录状态"
          class="w-[13vw] mx-[1vw]"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 登录时间 -->
      <div class="flex items-center">
        <div class="w-[100px] text-[18px] text-[#909399] font-bold mr-[10px]">
          登录时间
        </div>
        <el-date-picker
          v-model="inputloginTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="ml-[15px] mt-6">
      <el-row>
        <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]">
          <div class="flex justify-around">
            <Icon icon="eva:search-fill" />
            <span>搜索</span>
          </div>
        </el-button>
        <el-button class="w-[92px]">
          <div class="flex justify-around">
            <Icon icon="system-uicons:reset-alt" />
            <span>重置</span>
          </div>
        </el-button>
      </el-row>
    </div>
    <!-- 删除 -->
    <div class="ml-[15px] mt-6">
      <el-row>
        <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]">
          <div class="flex justify-around">
            <Icon icon="eva:search-fill" />
            <span>删除</span>
          </div>
        </el-button>
        <el-button class="w-[92px]" @click="Clear()">
          <div class="flex justify-around">
            <Icon icon="system-uicons:reset-alt" />
            <span>清空</span>
          </div>
        </el-button>
      </el-row>
    </div>
    <!-- 表格 -->
    <div>
      <template>
        <el-table
          :data="getmonitorLogininforAll"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="infoId" label="访问编号" width="120">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="browser"
            label="请求方式"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="ipaddr" label="登录地址" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="loginLocation"
            label="登录地点"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="browser" label="浏览器" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="os" label="操作系统" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="msg" label="登录状态" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="" label="操作信息" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="loginTime"
            label="登录日期"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
import { monitorLogininfor, deletemonitorLogininfor } from '@/service';

const { log } = console;

export default {
  data() {
    return {
      getmonitorLogininforAll: [],
      // 登录地址
      inputLoginAddress: '',
      // 登录时间
      inputloginTime: '',
      // 登录状态
      inputLoginStatus: '',
      // 角色名称
      inputNameSearch: '',
      options: [
        { value: '0', label: '登录成功' },
        { value: '1', label: '登录失败' },
      ],
    };
  },
  async created() {
    // 获取登录日志信息
    const getmonitorLogininfor = await monitorLogininfor();
    this.getmonitorLogininforAll = getmonitorLogininfor.data.data.result;
    log(this.getmonitorLogininforAll);
  },
  methods: {
    async Clear() {
      await deletemonitorLogininfor();
    },
  },
};
</script>

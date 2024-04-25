<template>
  <div class="px-[24px]">
    <div class="h-[100px] flex items-center">
      <span class="text-[18px] text-[#606266] font-bold mx-[10px]"
        >系统模块</span
      >
      <el-input
        v-model="xtmkinp"
        placeholder="请输入部门名称"
        class="w-[243px] h-[40px]"
      ></el-input>
      <span class="text-[18px] text-[#606266] font-bold mx-[10px]">类型</span>
      <el-input
        v-model="roleName"
        placeholder="请输入部门名称"
        class="w-[243px] h-[40px]"
      ></el-input>
      <span class="text-[18px] text-[#606266] font-bold mx-[10px]">操作</span>
      <el-select v-model="caozui" placeholder="请选择">
        <el-option
          v-for="item in optioncz"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span class="text-[18px] text-[#606266] font-bold mx-[10px]">状态</span>
      <el-select v-model="valuezc" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="flex">
      <div class="w-[100px] text-[18px] text-[#909399] font-bold mx-[10px]">
        创建时间
      </div>
      <el-date-picker
        v-model="valueDate"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <div class="ml-[20px]">
        <el-row>
          <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]">
            <div class="flex justify-around">
              <Icon icon="eva:search-fill" /> <span>搜索</span>
            </div>
          </el-button>
          <el-button class="w-[92px]"
            ><div class="flex justify-around">
              <Icon icon="system-uicons:reset-alt" /> <span>重置</span>
            </div></el-button
          >
        </el-row>
      </div>
    </div>
    <!-- 删除 -->
    <div class="mt-[30px]">
      <el-row>
        <el-button
          class="bg-[#ffe0e0] text-[#fff] w-[92px]"
          type="danger"
          plain
        >
          <div class="flex justify-around">
            <Icon icon="pajamas:remove" /> <span>删除</span>
          </div>
        </el-button>
        <el-button
          class="bg-[#ffe0e0] text-[#fff] w-[92px]"
          type="danger"
          plain
        >
          <div class="flex justify-around">
            <Icon icon="pajamas:remove" /> <span>清空</span>
          </div>
        </el-button>
      </el-row>
    </div>
    <!-- 表格 -->
    <div>
      <template>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="infoId" label="日志编号" width="120">
          </el-table-column>
          <el-table-column prop="ipaddr" label="系统模块" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="browser"
            label="请求方式"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="os" label="操作人员" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="status" label="主机" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="msg" label="操作地点" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="loginTime"
            label="操作状态"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="loginTime" label="用时" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="loginTime"
            label="日志内容"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="loginTime" label="操作" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
import { getrolelist } from '@/service';

const { log } = console;
export default {
  async created() {
    const czrz = await getrolelist();
    log(czrz);
  },
  data() {
    return {
      xtmkinp: '',
      roleName: '',
      valuezc: '',
      options: [
        {
          value: '选项1',
          label: '正常',
        },
        {
          value: '选项2',
          label: '不正常',
        },
      ],
      caozui: '',
      optioncz: [
        {
          value: '选项1',
          label: '删除',
        },
        {
          value: '选项2',
          label: '修改',
        },
      ],
      valueDate: '',
      tableData: [],
    };
  },
  methods: {
    handleSelectionChange() {
      log(111);
    },
  },
};
</script>

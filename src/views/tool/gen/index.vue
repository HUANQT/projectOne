<template>
  <!-- 身体部位 -->
  <div class="mx-4">
    <!-- 搜索 -->
    <div class="h-[100px] flex items-center">
      <!-- 部位 -->
      <div class="flex items-center justify-between">
        <div class="w-[60px] text-[18px]">部位:</div>
        <el-input v-model="part"></el-input>
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
      <div>
        <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]" @click="showmb = true">
          <div class="flex justify-around"><Icon icon="mingcute:add-fill" /><span>新增</span></div>
        </el-button>
        <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]">
          <div class="flex justify-around"><Icon icon="solar:pen-2-bold" /><span>修改</span></div>
        </el-button>
      </div>
      <div>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button icon="el-icon-search" circle></el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="getBodypartsAllCop" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="bodypart" label="部位"></el-table-column>
      <el-table-column prop="orderNum" label="排序ID"> </el-table-column>
      <el-table-column prop="create_time" label="添加时间"> </el-table-column>
      <el-table-column prop="" label="操作">
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
      v-show="showmb"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div class="bg-white w-[750px] h-[512px] rounded-[10px] p-[24px]">
        <!-- 标题 -->
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">添加</div>
          <!-- 退出 -->
          <div @click="showmb = false">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 部位 -->
        <div class="flex items-center justify-between mt-4">
          <div class="text-[18px] text-[#909399] font-bold">部位</div>
          <el-input class="w-[85%]" v-model="Newpart"></el-input>
        </div>
        <!-- 排序 -->
        <div class="flex items-center mt-4">
          <div class="text-[18px] text-[#909399] font-bold mr-4">排序ID</div>
          <el-input-number v-model="num" :min="1" :max="10000" label="排序ID"></el-input-number>
        </div>
        <!-- 确定取消 -->
        <div class="mt-[76px] pl-[540px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="addDept()">确定</el-button>
            <el-button @click="showmb = false">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Bodyparts, BodypartsNew, Bodypartsdelete } from '@/service';

const { log } = console;

export default {
  async created() {
    const getBodyparts = await Bodyparts();
    this.getBodypartsAll = getBodyparts.data.data.result;
    this.getBodypartsAllCop = this.getBodypartsAll;
    log('身体部位列表', this.getBodypartsAll);
  },
  data() {
    return {
      part: '',
      showmb: false,
      getBodypartsAll: [],
      num: '1',
      Newpart: '',
      getBodypartsAllCop: [],
    };
  },
  methods: {
    // 新增确定
    async addDept() {
      const getBodypartsNew = await BodypartsNew({
        id: 0,
        bodypart: this.Newpart,
        orderNum: this.num,
      });
      log(getBodypartsNew);
    },

    // 删除
    async deleteuserlit(id) {
      const getBodypartsdelete = await Bodypartsdelete(id);
      log(getBodypartsdelete);
    },
    // 搜索
    searchUser() {
      const filteredRows = this.getBodypartsAll.filter((row) =>
        row.bodypart.includes(this.part.trim())
      );
      log(filteredRows);
      this.getBodypartsAllCop = filteredRows;
    },
    // 重置
    reset() {
      this.part = '';
      this.getBodypartsAllCop = this.getBodypartsAll;
    },
  },
};
</script>

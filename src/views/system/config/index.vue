<template>
  <!-- 意见反馈 -->
  <div class="mt-4 ml-4">
    <!-- 搜索 -->
    <div class="flex items-center">
      <!-- 建议内容 -->
      <div class="flex items-center justify-between">
        <div class="w-40 text-[18px] text-[#909399] font-bold mr-[5px]">建议内容</div>
        <el-input v-model="SuggestedContent"></el-input>
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
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="role"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange22"
      class="mt-4"
      border
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="userId" label="ID"> </el-table-column>
      <el-table-column prop="deptName" label="用户id"> </el-table-column>
      <el-table-column prop="userName" label="提交时间"> </el-table-column>
      <el-table-column prop="email" label="提交内容"> </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
        <template v-slot="scope">
          <el-button type="text">
            <div class="flex" @click="showmbxg(scope.row.id)">
              <Icon icon="solar:pen-2-bold" /><span>详情</span>
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
import { Feedbacklist, FeedbackID, FeedbackDeleteID } from '@/service';

const { log } = console;

export default {
  async created() {
    const getFeedbacklist = await Feedbacklist();
    this.FeedbacklistAll = getFeedbacklist.data.data.result;
    log('意见反馈列表', this.FeedbacklistAll);
  },
  data() {
    return {
      // 意见反馈列表
      FeedbacklistAll: '',
      // 建议内容
      SuggestedContent: '',
      // 意见反馈详情
      FeedbackIDAll: '',
    };
  },
  methods: {
    // 搜索
    searchUser() {},
    // 重置
    reset() {
      log(456);
    },
    async showmbxg(id) {
      const getFeedbackID = await FeedbackID(id);
      this.FeedbackIDAll = getFeedbackID;
      log('意见反馈详情', this.FeedbackIDAll);
    },
    // 删除
    async deleteuserlit(id) {
      const getFeedbackDeleteID = await FeedbackDeleteID(id);
      this.FeedbackDeleteIDAll = getFeedbackDeleteID;
      log(this.FeedbackDeleteIDAll);
    },
  },
};
</script>

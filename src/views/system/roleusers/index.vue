<template>
  <div class="pl-[26px] pt-[20px] h-[100%] flex">
    <!-- 左 -->
    <div class="w-[240px] h-[90vh] border">
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column prop="roleName" label="角色名称" class="w-[100%]">
          <template slot-scope="scope">
            <div @click="hqjs(scope.row.roleId)">{{ scope.row.roleName }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 右 -->
    <div class="ml-[30px]">
      <div>
        <el-row>
          <el-button type="success" @click="add">添加用户</el-button>
          <el-button type="danger">批量取消授权</el-button>
        </el-row>
      </div>
      <div class="mt-[20px]">
        <template>
          <el-table
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
            <el-table-column prop="status" label="状态" width="120">
              <template slot-scope="scope">
                <div
                  v-if="scope.row.status == 0"
                  class="w-[15px] h-[15px] leading-[15px] bg-green-400 text-white rounded-[50%] text-center"
                ></div>
                <div
                  v-else
                  class="w-[15px] h-[15px] leading-[15px] bg-red-400 text-white rounded-[50%] text-center"
                ></div>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="备注" width="120"> </el-table-column>
            <el-table-column prop="address" label="操作" width="120">
              <el-button type="text" class="text-[#50c5c4]">取消授权</el-button>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <!-- 添加用户蒙版 -->
    <div
      v-show="addrole"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-[750px] rounded-[10px] p-[24px]">
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">添加用户</div>
          <div @click="handleIconClick">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 新用户还没添加的 -->
        <div class="mt-[10px]">
          <el-table
            ref="multipleTable"
            :data="rowrole"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            border
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="userId" label="用户编号" width="120"> </el-table-column>
            <el-table-column prop="userName" label="用户名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="deptName" label="用户昵称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="用户状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <div
                  v-if="scope.row.status == 0"
                  class="w-[15px] h-[15px] leading-[15px] bg-green-400 text-white rounded-[50%] text-center"
                >
                  √
                </div>
                <div
                  v-else
                  class="w-[15px] h-[15px] leading-[15px] bg-red-400 text-white rounded-[50%] text-center"
                >
                  ×
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 确定取消 -->
        <div class="mt-[76px] pl-[540px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="xiugai()">确定</el-button>
            <el-button @click="handleIconClick">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sysRolelist, fenUserRole, wfprole, addwfprole } from '@/service';

const { log } = console;
export default {
  async created() {
    // 自发 this指向当前自发进行的实例
    this.getrole();
  },
  data() {
    return {
      addrole: false,
      tableData: [],
      rowrole: [],
      role: [],
      jsid: '',
    };
  },
  methods: {
    async getrole() {
      const xiala = await sysRolelist();
      this.tableData = xiala.data.data.result;
      log('tableData', this.tableData);
    },
    async hqjs(id) {
      // 用户
      const mylist = await fenUserRole(id);
      this.role = mylist.data.data;
      log('分配好的', this.role);
      this.jsid = id;
    },
    async add() {
      this.addrole = true;
      // 没有分配的
      const wfp = await wfprole({ roleId: this.jsid });
      this.rowrole = wfp.data.data;
      log('没有分配的', this.rowrole);
    },
    async xiugai() {
      this.addrole = false;
      const add = await addwfprole({
        roleId: this.jsid,
        userIds: [0],
      });
      log(add);
    },
    handleIconClick() {
      this.addrole = false;
    },
    handleSelectionChange() {},
    handleSelectionChange22() {},
  },
};
</script>

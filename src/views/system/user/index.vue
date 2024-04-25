<template>
  <!-- 用户管理 -->
  <div>
    <div class="w-[1200px] h-[100px] flex items-center justify-around">
      <!-- 部门名称 -->
      <div>
        <el-input v-model="bmNameinp" placeholder="请输入部门名称"></el-input>
      </div>
      <!-- 用户名称 -->
      <div class="w-[300px] flex items-center justify-between">
        <div class="w-[100px] text-[18px] text-[#909399] font-bold mr-[10px]">用户名称</div>
        <el-input v-model="yhNameinp" placeholder="请输入用户名称"></el-input>
      </div>
      <div class="flex items-center justify-between">
        <div class="w-[100px] text-[18px] text-[#909399] font-bold mr-[10px]">手机号码</div>
        <el-input v-model="Photoinp" placeholder="请输入手机号码"></el-input>
      </div>
      <div class="flex items-center justify-between">
        <div class="text-[18px] text-[#909399] font-bold mr-[10px]">状态</div>
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
    </div>
    <div class="flex">
      <!-- 左 -->
      <div class="w-[300px] h-[100vh]">
        <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <!-- 右 -->
      <div class="w-full h-[100vh]">
        <div class="flex items-center">
          <div class="w-[100px] text-[18px] text-[#909399] font-bold mr-[10px]">创建时间</div>
          <el-date-picker
            v-model="valueDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <div class="ml-[15px]">
            <el-row>
              <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]" @click="searchUser">
                <div class="flex justify-around">
                  <Icon icon="eva:search-fill" /> <span>搜索</span>
                </div>
              </el-button>
              <el-button class="w-[92px]" @click="chongzhi"
                ><div class="flex justify-around">
                  <Icon icon="system-uicons:reset-alt" />
                  <span>重置</span>
                </div></el-button
              >
            </el-row>
          </div>
        </div>
        <!-- 新增修改删除 -->
        <div>
          <el-button class="mt-[24px]">
            <div class="flex"><Icon icon="solar:pen-2-bold" /><span>修改</span></div>
          </el-button>
          <el-button @click="dakaimb">
            <div class="flex"><Icon icon="mingcute:add-fill" /><span>新增</span></div>
          </el-button>
          <el-button>
            <div class="flex"><Icon icon="pajamas:remove" /><span>删除</span></div>
          </el-button>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="myuserlistCop"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="userId" label="用户编号" width="120"> </el-table-column>
            <el-table-column prop="userName" label="用户名称" width="120"> </el-table-column>
            <el-table-column prop="nickName" label="用户昵称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="avatar" label="头像" show-overflow-tooltip>
              <!-- <template slot-scope="scope">
                <img :src="scope.row.avatar" alt="" />
              </template> -->
            </el-table-column>
            <el-table-column prop="deptName" label="部门" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="phonenumber" label="手机号码" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="用户状态" show-overflow-tooltip>
              <template v-slot="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="loginDate" label="创建时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip>
              <template v-slot="scope">
                <el-button type="text">
                  <div class="flex" @click="shanchu(scope.row.userId)">
                    <Icon icon="pajamas:remove" /><span>删除</span>
                  </div>
                </el-button>
                <el-button type="text">
                  <div class="flex"><Icon icon="solar:pen-2-bold" /><span>修改</span></div>
                </el-button>
                <el-button type="text">
                  <div class="flex"><Icon icon="mingcute:add-fill" /><span>新增</span></div>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 蒙版 -->
    <div
      v-show="showmb"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <!-- cha -->
      <div class="bg-white w-[750px] h-[682px] rounded-[10px] p-[24px]">
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">添加部门</div>
          <div @click="gbxzmb">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 名称和密码 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">用户名</span>
            <el-input v-model="Name" placeholder="请输入名称" class="w-[250px]"></el-input>
          </div>
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">用户密码</span>
            <el-input v-model="password" placeholder="请输入用户密码" class="w-[250px]"></el-input>
          </div>
        </div>
        <!-- 用户昵称 部门 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">用户昵称</span>
            <el-input v-model="Nameni" placeholder="请输入名称" class="w-[250px]"></el-input>
          </div>
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">归属部门</span>
            <el-select
              v-model="valuetree"
              placeholder="请选择"
              class="w-[250px]"
              @change="handleSelectChange"
            >
              <el-option
                v-for="item in tree"
                :key="item.value"
                :label="item.label"
                :value="item.id"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 手机号码 邮箱 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">手机号码</span>
            <el-input v-model="photonamber" placeholder="请输入名称" class="w-[250px]"></el-input>
          </div>
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">邮箱</span>
            <el-input v-model="emil" placeholder="请输入用户密码" class="w-[250px]"></el-input>
          </div>
        </div>
        <!-- 用户性别 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">性别</span>
            <el-select v-model="valuesex" placeholder="请选择" class="w-[250px]">
              <el-option
                v-for="item in sex"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">用户状态</span>
            <div class="ml-[15px]">
              <el-radio v-model="radio" label="1" class="text-[18px] text-[#909399]">正常</el-radio>
              <el-radio v-model="radio" label="2" class="text-[18px] text-[#909399]">停用</el-radio>
            </div>
          </div>
        </div>
        <!-- 角色 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">角色</span>
            <el-select v-model="valuejuese" placeholder="请选择" class="w-[250px]">
              <el-option
                v-for="item in juese"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 备注 -->
        <div class="flex justify-between mt-[28px]">
          <span class="text-[18px] text-[#909399] font-bold">备注</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
            class="w-[600px] mr-[15px]"
          >
          </el-input>
        </div>
        <!-- 确定 -->
        <div>
          <div class="mt-[76px] pl-[540px]">
            <el-row>
              <el-button class="bg-[#13c2c2] text-[#fff]" @click="tianjiaqd">确定</el-button>
              <el-button @click="gbxzmb">取消</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  //
  gettreeselect,
  getuserlist,
  editadd,
  deletuserid,
} from '@/service';

const { log } = console;
export default {
  async created() {
    // 自发 this指向当前自发进行的实例
    this.getFund();
  },
  data() {
    return {
      showmb: false,
      bmNameinp: '',
      yhNameinp: '',
      Photoinp: '',
      valuezc: '',
      valueDate: '',
      radio: '1',
      textarea: '',
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
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      tree: [],
      myuserlist: [],
      // 蒙版
      valuetree: '',
      Name: '',
      password: '',
      Nameni: '',
      photonamber: '',
      emil: '',
      avatar: '',
      sex: [
        {
          value: '选项1',
          label: '男',
        },
        {
          value: '选项2',
          label: '女',
        },
      ],
      juese: [
        {
          value: '选项1',
          label: '管理员',
        },
        {
          value: '选项2',
          label: '超级管理员',
        },
      ],
      valuesex: '',
      valuejuese: '',
      clickedNodeId: [],
      xzid: '',
      // 表格数据
      myuserlistCop: [],
    };
  },

  methods: {
    // 重置
    chongzhi() {
      window.location.reload();
    },

    // 模糊查询
    searchUser() {
      // 调用搜索功能
      // log('部门昵称', this.bmNameinp);
      // log('用户昵称', this.yhNameinp);
      // log('表格数据', this.myuserlist);
      // eslint-disable-next-line array-callback-return
      const filteredRows = this.myuserlist.filter((row) => {
        row.userName.includes(this.yhNameinp.trim());
      });
      // log('搜索信息', filteredRows);
      this.myuserlistCop = filteredRows;
    },
    handleSelectionChange() {},
    // 处理表格选中事件
    async getFund() {
      const xiala = await gettreeselect();
      const mylist = await getuserlist();
      this.tree = xiala.data.data;
      this.myuserlist = mylist.data.data.result;
      this.myuserlistCop = this.myuserlist;
      log(this.tree);
    },
    async handleNodeClick(value) {
      log(value);
      let res1 = (await getuserlist()).data.data.result;
      log(res1);
      res1 = res1.filter((obj) => obj.deptId === value.id);
      this.myuserlistCop = res1;
      log(this.myuserlistCop);
      log(this.myuserlist);
      this.clickedNodeId = value.id;
      log(value.id);
    },
    async dakaimb() {
      this.showmb = true;
    },
    gbxzmb() {
      this.showmb = false;
    },
    handleSelectChange(id) {
      this.xzid = id;
    },
    // 删除操作
    async shanchu(id) {
      const shanid = await deletuserid(id);
      log(shanid);
    },
    async tianjiaqd() {
      this.showmb = false;
      const add = await editadd({
        create_by: 'admin',
        create_time: '2024-04-10T08:04:44.639Z',
        update_by: '123456',
        update_time: '2024-04-10T08:04:44.639Z',
        remark: '',
        beginTime: '2024-04-10T08:04:44.639Z',
        endTime: '2024-04-10T08:04:44.639Z',
        userId: 0,
        userName: this.Name,
        nickName: this.Nameni,
        avatar: '',
        email: this.emil,
        password: '123456',
        phonenumber: this.photonamber,
        sex: '男',
        status: '1',
        delFlag: '0',
        loginIP: '192.168.68.221',
        loginDate: '2024-04-10T08:04:44.639Z',
        deptId: this.xzid,
        isSuperAdmin: true,
        deptName: '总部',
        roleIds: [0],
        postIds: [0],
        roles: [
          {
            create_by: 'admin',
            create_time: '2024-04-10T08:04:44.639Z',
            update_by: '123456',
            update_time: '2024-04-10T08:04:44.639Z',
            remark: '',
            beginTime: '2024-04-10T08:04:44.639Z',
            endTime: '2024-04-10T08:04:44.639Z',
            roleId: 0,
            roleName: '管理员',
            roleKey: '123456',
            roleSort: 0,
            status: '1',
            delFlag: '0',
            menuIds: [0],
            deptIds: [0],
          },
        ],
      });
      log(add);
    },
  },
};
</script>

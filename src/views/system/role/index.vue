<!-- eslint-disable implicit-arrow-linebreak -->
<!-- eslint-disable no-dupe-keys -->
<!-- eslint-disable implicit-arrow-linebreak -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vue/no-deprecated-slot-scope-attribute -->
<!-- eslint-disable max-len -->
<template>
  <!-- 角色管理 -->
  <div class="ml-10 mt-6">
    <!-- 角色管理搜索框 -->
    <div class="flex">
      <!-- 角色搜索 -->
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
      <!-- 角色状态 -->
      <div class="items-center flex justify-between">
        <span>状态</span>
        <el-select v-model="value" placeholder="角色状态" class="w-[13vw] mx-[1vw]">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 按钮 -->
      <div class="flex justify-between">
        <el-button class="bg-[#13c2c2] text-[#fff]" @click="NameSearch()"
          ><i class="el-icon-search mx-1"></i> 搜索</el-button
        >
        <el-button><i class="el-icon-refresh mx-1"></i>重置</el-button>
      </div>
    </div>
    <!-- 增加蒙版部分  -->
    <div>
      <!-- 增加 -->
      <el-button class="my-6 bg-[#e7f9f9] border-[#a1e7e7] text-[#81daf9]" @click="flage = true"
        ><i class="el-icon-plus mx-1"></i>增加</el-button
      >
      <!-- 蒙版 -->
      <div
        class="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)] z-10"
        :class="flage ? 'block' : 'hidden'"
      >
        <!-- 角色增加 -->
        <div class="bg-white absolute top-[25%] left-[50%] ml-[-25rem] p-[24px]">
          <!-- 标题 -->
          <div class="flex justify-between">
            <div class="text-[22px] tetx-[#303133]">添加角色</div>
            <div @click="flage = false">
              <Icon
                icon="emojione:heavy-multiplication-x"
                class="text-[12px] tetx-[#9a9da3] cursor-pointer"
              />
            </div>
          </div>
          <!-- 内容 -->
          <div class="my-4">
            <!-- 角色名称 -->
            <div class="flex items-center my-4">
              <span>角色名称</span>
              <el-input
                class="mx-1 w-[80%]"
                v-model="inputName"
                placeholder="请输入角色名称"
              ></el-input>
            </div>
            <!-- 权限字符 -->
            <div class="flex items-center my-4">
              <span>权限字符</span>
              <el-input
                class="mx-1 w-[80%]"
                v-model="inputAuthority"
                placeholder="请输入权限字符"
              ></el-input>
            </div>
            <!-- 角色顺序 -->
            <div class="flex items-center my-4">
              <span>角色顺序</span>
              <el-input-number
                v-model="num"
                controls-position="right"
                :min="1"
                :max="10"
                class="w-[250px]"
              ></el-input-number>
            </div>
            <!-- 状态 -->
            <div class="flex items-center">
              <span>状态</span>
              <div class="ml-[15px] my-4">
                <el-radio v-model="radio" label="0" class="text-[18px] text-[#909399]"
                  >正常</el-radio
                >
                <el-radio v-model="radio" label="1" class="text-[18px] text-[#909399]"
                  >停用</el-radio
                >
              </div>
            </div>
            <!-- 备注 -->
            <div class="flex items-center my-4">
              <span>备注</span>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
              </el-input>
            </div>
          </div>
          <!-- 确定取消 -->
          <div class="mt-[76px] pl-[300px]">
            <el-row>
              <el-button class="bg-[#13c2c2] text-[#fff]" @click="department()">确定</el-button>
              <el-button>取消</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="flex">
      <div class="w-[60%]">
        <el-table :data="sysRolelistAll" border>
          <el-table-column prop="roleId" label="编号" width="120"> </el-table-column>
          <el-table-column prop="roleName" label="名称" width="120"> </el-table-column>
          <el-table-column prop="roleKey" label="权限字符" width="150"> </el-table-column>
          <el-table-column prop="roleSort" label="状态" width="120"> </el-table-column>
          <el-table-column prop="createTime" label="创建时间"> </el-table-column>
          <el-table-column prop="" label="操作" width="250">
            <template slot-scope="sope">
              <span class="text-[#13c2c2]" @click="modify(sope.row)"
                ><i class="el-icon-edit"></i>修改</span
              >
              <span class="ml-4 text-[#13c2c2]" @click="Delete(sope.row)"
                ><i class="el-icon-delete"></i>删除</span
              >
              <span class="ml-4 text-[#13c2c2]" @click="DataPermissions(sope.row)"
                ><i class="el-icon-success"></i>数据权限</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 权限面板 -->
      <div class="w-[40%] ml-4" :class="DataPermissionsflage ? 'block' : 'hidden'">
        <div>权限字符 {{ DataPermissions_roleKey }}</div>
        <div class="flex items-center mt-6">
          <div class="mx-2">数据权限</div>
          <div>
            <!-- 选项 -->
            <el-checkbox-group v-model="checkList">
              <el-checkbox @change="handleExpandAllChange" label="展开/折叠"></el-checkbox>
              <el-checkbox
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                label="全选/全不选"
              ></el-checkbox>
              <el-checkbox label="父子联动" @change="handlefatherSon"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <!-- 详情 -->
        <div class="ml-20 mt-2 h-40">
          <el-tree
            v-if="fatherSon"
            :data="sysMenutreeSelectAll"
            show-checkbox
            node-key="id"
            ref="tree"
            default-expanded-all
            :check-strictly="false"
            :props="defaultProps"
          >
          </el-tree>
          <el-tree
            v-else
            :data="sysMenutreeSelectAll"
            show-checkbox
            node-key="id"
            ref="tree"
            :check-strictly="true"
            :props="defaultProps"
          >
          </el-tree>
        </div>
      </div>
    </div>
    <!-- 蒙版 -->
    <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.5)] z-10"
      :class="modifyflage ? 'block' : 'hidden'"
    >
      <!-- 角色增加 -->
      <div class="bg-white absolute top-[25%] left-[50%] ml-[-25rem] p-[24px]">
        <!-- 标题 -->
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">修改角色</div>
          <div @click="modifyflage = false">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 内容 -->
        <div class="my-4">
          <!-- 角色名称 -->
          <div class="flex items-center my-4">
            <span>角色名称</span>
            <el-input
              class="mx-1 w-[80%]"
              v-model="modifyinputName"
              placeholder="请输入角色名称"
            ></el-input>
          </div>
          <!-- 权限字符 -->
          <div class="flex items-center my-4">
            <span>权限字符</span>
            <el-input
              class="mx-1 w-[80%]"
              v-model="modifyinputAuthority"
              placeholder="请输入权限字符"
            ></el-input>
          </div>
          <!-- 角色顺序 -->
          <div class="flex items-center my-4">
            <span>角色顺序</span>
            <el-input-number
              v-model="modifynum"
              controls-position="right"
              :min="1"
              :max="10"
              class="w-[250px]"
            ></el-input-number>
          </div>
          <!-- 状态 -->
          <div class="flex items-center">
            <span>状态</span>
            <div class="ml-[15px] my-4">
              <el-radio v-model="modifyradio" label="0" class="text-[18px] text-[#909399]"
                >正常</el-radio
              >
              <el-radio v-model="modifyradio" label="1" class="text-[18px] text-[#909399]"
                >停用</el-radio
              >
            </div>
          </div>
          <!-- 备注 -->
          <div class="flex items-center my-4">
            <span>备注</span>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
            </el-input>
          </div>
        </div>
        <!-- 确定取消 -->
        <div class="mt-[76px] pl-[300px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="modifydepartment()">确定</el-button>
            <el-button>取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// api
import {
  sysRolelist,
  sysRoleEdit,
  sysRoleId,
  sysRoleEditP,
  sysMenulist,
  sysMenutreeSelect,
} from '@/service';

const { log } = console;
export default {
  name: 'roleManagement',
  async created() {
    const getsysRolelist = await sysRolelist();
    this.sysRolelistAll = getsysRolelist.data.data.result;
    log(this.sysRolelistAll);
  },
  data() {
    return {
      // 全选
      checkedCount: 0,
      isIndeterminate: false,

      // 角色名称
      inputName: '',
      // 权限字符
      inputAuthority: '',
      // 备注
      textarea: '',
      radio: '0',
      num: '2',
      // 角色名称
      modifyinputName: '',
      // 权限字符
      modifyinputAuthority: '',
      // 备注
      modifytextarea: '',
      modifyradio: '0',
      modifynum: '2',
      // 角色状态
      options: [
        { value: '0', label: '正常' },
        { value: '1', label: '停用' },
      ],
      value: '',
      // 状态
      valueState: true,
      // 蒙版隐藏
      flage: false,
      modifyflage: false,
      DataPermissionsflage: false,
      // 表格
      sysRolelistAll: [],
      DataPermissions_roleKey: '',
      inputNameSearch: '',
      checkList: [],

      sysMenutreeSelectAll: [],
      checkAll: false,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      fatherSon: false,
    };
  },
  methods: {
    // 点击确定添加
    async department() {
      // log(this.inputName);
      // log(this.inputAuthority);
      // log(this.textarea);
      // log(this.radio);
      // log(this.num);
      const getsysRoleEdit = await sysRoleEdit({
        create_by: 'string',
        create_time: new Date().toLocaleDateString,
        update_by: 'string',
        update_time: '2024-04-10',
        remark: 'null',
        beginTime: '2024-04-10',
        endTime: '2024-04-10',
        roleId: this.num,
        roleName: this.inputName,
        roleKey: this.inputAuthority,
        roleSort: 0,
        status: '0',
        delFlag: 'string',
        menuIds: [0],
        deptIds: [0],
      });
      log(getsysRoleEdit);
      this.flage = false;
      window.location.reload();
    },
    // 删除
    async Delete(value) {
      log(value.roleId);
      const getsysRoleId = await sysRoleId(value.roleId);
      log(getsysRoleId);
      window.location.reload();
    },
    // 修改
    async modify(value) {
      log(value);
      log(value.roleName);
      log(value.roleKey);
      log(value.createTime);
      log(value.roleId);
      log(value.roleSort);
      this.modifyflage = true;
      this.modifynum = value.roleId;
      this.modifyinputName = value.roleName;
      this.modifyinputAuthority = value.roleKey;
    },
    async modifydepartment() {
      const getsysRoleEditp = await sysRoleEditP({
        create_by: 'admin',
        create_time: new Date().toLocaleDateString,
        update_by: 'string',
        update_time: '2024-04-11',
        remark: 'string',
        beginTime: '2024-04-11',
        endTime: '2024-04-11',
        roleId: this.modifynum,
        roleName: this.modifyinputName,
        roleKey: this.modifyinputAuthority,
        roleSort: 0,
        status: '0',
        delFlag: 'string',
        menuIds: [0],
        deptIds: [0],
      });
      log(getsysRoleEditp);

      // window.location.reload();
    },
    // 权限字符
    async DataPermissions(value) {
      log(value.roleId);
      this.DataPermissions_roleKey = value.roleKey;
      this.DataPermissionsflage = true;
      const getsysMenulist = await sysMenulist();
      const getsysMenutreeSelect = await sysMenutreeSelect(value.roleId);
      log(getsysMenulist);
      log(getsysMenutreeSelect);
      this.sysMenutreeSelectAll = getsysMenutreeSelect.data.data.menus;
      log(this.sysMenutreeSelectAll);
    },

    // 展开折叠
    handleExpandAllChange(checked) {
      log(this.$refs.tree.expandAll);

      // this.$refs.tree.expandAll(checked);
    },

    // 全选/全不选
    handleCheckAllChange(checked) {
      if (checked) {
        this.$refs.tree.setCheckedNodes(this.sysMenutreeSelectAll);
      } else {
        this.$refs.tree.setCheckedKeys([]);
      }
      this.checkedCount = checked ? this.sysMenutreeSelectAll.length : 0;
    },

    // 父子联动
    handlefatherSon(checked) {
      this.fatherSon = checked;
    },

    // 浅搜索
    NameSearch() {
      log(this.inputNameSearch);
      log(this.sysRolelistAll.filter);
      const filteredRows = this.sysRolelistAll.filter((row) =>
        row.roleName.includes(this.inputNameSearch.trim())
      );
      log(filteredRows);
      this.sysRolelistAll = filteredRows;
    },
  },
};
</script>

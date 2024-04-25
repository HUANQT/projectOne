<template>
  <!-- 菜单管理 -->
  <div class="px-[24px]">
    <!-- 搜索 -->
    <div class="w-full h-[90px]">
      <div class="w-[840px] h-[90px] flex items-center justify-between">
        <span class="text-[18px] text-[#606266] font-bold">菜单名称</span>
        <el-input
          v-model="Nameinp"
          placeholder="请输入菜单名称"
          class="w-[243px] h-[40px]"
        ></el-input>
        <span class="text-[18px] text-[#606266] font-bold">状态</span>
        <el-select v-model="valuezc" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-row>
          <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]">
            <div class="flex justify-around" @click="searchUser">
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
    <!-- 操作 -->
    <div class="h-[60px] flex justify-between items-center">
      <el-row>
        <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]">
          <div class="flex justify-around" @click="dakai">
            <Icon icon="mingcute:add-fill" /><span>新增</span>
          </div>
        </el-button>
        <el-button class="bg-[#13c2c2] text-[#fff]">
          <div class="flex justify-around">
            <Icon icon="mingcute:add-fill" /><span>修改排序</span>
          </div>
        </el-button>
        <el-button class="bg-[#13c2c2] text-[#fff]">
          <div class="flex justify-around">
            <Icon icon="mingcute:add-fill" /><span>展开/折叠</span>
          </div>
        </el-button>
      </el-row>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="tableData22"
        style="width: 100%"
        row-key="id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="label" label="菜单名称"> </el-table-column>
        <el-table-column
          prop="name"
          label="图标"
          width="80"
          :formatter="(row) => getMenuData(row, 'icon')"
        >
        </el-table-column>
        <el-table-column
          prop="menuType"
          label="类型"
          width="80"
          :formatter="(row) => getMenuData(row, 'menuType')"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="排序"
          width="80"
          :formatter="(row) => getMenuData(row, 'orderNum')"
        >
        </el-table-column>
        <el-table-column prop="address" label="权限标识"> </el-table-column>
        <el-table-column
          prop="address"
          label="路由地址"
          :formatter="(row) => getMenuData(row, 'path')"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="组件路径"
          :formatter="(row) => getMenuData(row, 'component')"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="显示"
          width="80"
          :formatter="(row) => getMenuData(row, 'visible')"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态"
          width="80"
          :formatter="(row) => getMenuData(row, 'status')"
        >
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="xiugai(scope.row.id)">
              <div class="flex">
                <Icon icon="solar:pen-2-bold" /><span>修改{{ scope.row.id }}</span>
              </div>
            </el-button>
            <el-button type="text">
              <div class="flex" @click="dkxzdj(scope.row)">
                <Icon icon="mingcute:add-fill" /><span>新增</span>
              </div>
            </el-button>
            <el-button type="text">
              <div class="flex" @click="shanchu(scope.row.id)">
                <Icon icon="pajamas:remove" /><span>删除</span>
              </div>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增蒙版 -->
    <div
      v-show="mb"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-[760px] h-[610px] rounded-[10px] p-[24px]">
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">添加菜单</div>
          <div @click="guanbimb">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 上局部门 -->
        <div class="h-[47px] mt-[20px] flex justify-between items-center">
          <span class="text-[18px] text-[#909399] font-bold">上级部门</span>
          <div class="block">
            <el-cascader
              :options="tableData"
              :props="{ checkStrictly: true, value: 'id' }"
              clearable
              class="w-[610px]"
              @change="handleCascaderChange"
            ></el-cascader>
          </div>
        </div>
        <!-- 菜单类型 -->
        <div class="h-[47px] mt-[24px] flex items-center">
          <span class="text-[18px] text-[#909399] font-bold mr-[30px]">菜单类型</span>
          <el-button-group>
            <el-button type="primary" @click="handleButtonClick('M')">目录</el-button>
            <el-button type="primary" @click="handleButtonClick('C')">菜单</el-button>
            <el-button type="primary" @click="handleButtonClick('F')">按钮</el-button>
          </el-button-group>
        </div>
        <!-- 菜单名称 -->
        <div class="flex justify-between mt-[24px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">菜单名称</span>
            <el-input
              v-model="inputName"
              placeholder="请输入内容"
              class="w-[250px] ml-[34px]"
            ></el-input>
          </div>
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">显示排序</span>
            <el-input-number
              v-model="num"
              controls-position="right"
              @change="handleChange"
              :min="1"
              class="w-[250px]"
            ></el-input-number>
          </div>
        </div>
        <!-- 菜单图标 -->
        <div class="w-full flex justify-between items-center mt-[24px]">
          <span class="text-[18px] text-[#909399] font-bold">菜单图标</span>
          <el-input v-model="cdtb" placeholder="请输入角色名称" class="w-[610px]"></el-input>
        </div>
        <!-- 路由地址 -->
        <div class="w-full flex justify-between items-center mt-[24px]">
          <span class="text-[18px] text-[#909399] font-bold">路由地址</span>
          <el-input v-model="lydz" placeholder="请输入角色名称" class="w-[610px]"></el-input>
        </div>
        <!-- 显示状态 -->
        <div class="w-full flex justify-between items-center mt-[24px]">
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">显示状态</span>
            <div class="ml-[30px]">
              <el-radio v-model="radio" label="0" class="text-[18px] text-[#909399]">显示</el-radio>
              <el-radio v-model="radio" label="1" class="text-[18px] text-[#909399]">隐藏</el-radio>
            </div>
          </div>
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">是否外联</span>
            <div class="ml-[30px]">
              <el-radio v-model="wlian" label="0" class="text-[18px] text-[#909399]">是</el-radio>
              <el-radio v-model="wlian" label="1" class="text-[18px] text-[#909399]">否</el-radio>
            </div>
          </div>
        </div>
        <!--菜单状态  -->
        <div class="w-full flex justify-between items-center mt-[24px]">
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">菜单状态</span>
            <div class="ml-[30px]">
              <el-radio v-model="cdzt" label="0" class="text-[18px] text-[#909399]">正常</el-radio>
              <el-radio v-model="cdzt" label="1" class="text-[18px] text-[#909399]">停用</el-radio>
            </div>
          </div>
        </div>
        <!-- 确定 -->
        <div class="mt-[46px] pl-[540px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="scuess">确定</el-button>
            <el-button>取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 修改蒙版 -->
    <div
      v-show="xiugaimb"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-[760px] h-[610px] rounded-[10px] p-[24px]">
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">修改菜单</div>
          <div @click="guanbixg">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 上局部门 -->
        <div class="h-[47px] mt-[20px] flex justify-between items-center">
          <span class="text-[18px] text-[#909399] font-bold">上级部门</span>
          <div class="block">
            <el-cascader
              :options="tableData"
              :props="{ checkStrictly: true, value: 'id' }"
              clearable
              class="w-[610px]"
              @change="handleCascaderChange"
            ></el-cascader>
          </div>
        </div>
        <div class="h-[47px] mt-[24px] flex items-center">
          <span class="text-[18px] text-[#909399] font-bold mr-[30px]">菜单类型</span>
          <el-button-group>
            <el-button type="primary" @click="handleButtonClick('M')">目录</el-button>
            <el-button type="primary" @click="handleButtonClick('C')">菜单</el-button>
            <el-button type="primary" @click="handleButtonClick('F')">按钮</el-button>
          </el-button-group>
        </div>
        <!-- 菜单名称 -->
        <div class="flex justify-between mt-[24px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">菜单名称</span>
            <el-input
              v-model="inputNamexg"
              placeholder="请输入内容"
              class="w-[250px] ml-[34px]"
            ></el-input>
          </div>
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">显示排序</span>
            <el-input-number
              v-model="numxg"
              controls-position="right"
              @change="handleChange"
              :min="1"
              class="w-[250px]"
            ></el-input-number>
          </div>
        </div>
        <!-- icon -->
        <div class="w-full flex justify-between items-center mt-[24px]">
          <span class="text-[18px] text-[#909399] font-bold">菜单图标</span>
          <el-input v-model="cdtbxg" placeholder="请输入角色名称" class="w-[610px]"></el-input>
        </div>
        <!-- 路由地址 -->
        <div class="w-full flex justify-between items-center mt-[24px]">
          <span class="text-[18px] text-[#909399] font-bold">路由地址</span>
          <el-input v-model="lydzxg" placeholder="请输入角色名称" class="w-[610px]"></el-input>
        </div>
        <!-- 显示状态 -->
        <div class="w-full flex justify-between items-center mt-[24px]">
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">显示状态</span>
            <div class="ml-[30px]">
              <el-radio v-model="radioxg" label="0" class="text-[18px] text-[#909399]"
                >显示</el-radio
              >
              <el-radio v-model="radioxg" label="1" class="text-[18px] text-[#909399]"
                >隐藏</el-radio
              >
            </div>
          </div>
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">是否外联</span>
            <div class="ml-[30px]">
              <el-radio v-model="wlianxg" label="0" class="text-[18px] text-[#909399]">是</el-radio>
              <el-radio v-model="wlianxg" label="1" class="text-[18px] text-[#909399]">否</el-radio>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-between items-center mt-[24px]">
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">菜单状态</span>
            <div class="ml-[30px]">
              <el-radio v-model="cdztxg" label="0" class="text-[18px] text-[#909399]"
                >正常</el-radio
              >
              <el-radio v-model="cdztxg" label="1" class="text-[18px] text-[#909399]"
                >停用</el-radio
              >
            </div>
          </div>
        </div>
        <!-- 确定 -->
        <div class="mt-[46px] pl-[540px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="xgsuccess">确定</el-button>
            <el-button>取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 点击的新增传父级id -->
    <div
      v-show="djxz"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-[760px] h-[610px] rounded-[10px] p-[24px]">
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">新增菜单</div>
          <div @click="djxzgb">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 上局部门 -->
        <div class="h-[47px] mt-[20px] flex justify-between items-center">
          <span class="text-[18px] text-[#909399] font-bold">上级部门</span>
          <el-input
            v-model="sjbm"
            placeholder="请输入角色名称"
            :disabled="true"
            class="w-[610px]"
          ></el-input>
        </div>
        <div class="h-[47px] mt-[24px] flex items-center">
          <span class="text-[18px] text-[#909399] font-bold mr-[30px]">菜单类型</span>
          <el-button-group>
            <el-button type="primary" @click="handleButtonClick('M')">目录</el-button>
            <el-button type="primary" @click="handleButtonClick('C')">菜单</el-button>
            <el-button type="primary" @click="handleButtonClick('F')">按钮</el-button>
          </el-button-group>
        </div>
        <!-- 菜单名称 -->
        <div class="flex justify-between mt-[24px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">菜单名称</span>
            <el-input
              v-model="inputNamedj"
              placeholder="请输入内容"
              class="w-[250px] ml-[34px]"
            ></el-input>
          </div>
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">显示排序</span>
            <el-input-number
              v-model="numdj"
              controls-position="right"
              @change="handleChange"
              :min="1"
              class="w-[250px]"
            ></el-input-number>
          </div>
        </div>
        <!-- icon -->
        <div class="w-full flex justify-between items-center mt-[24px]">
          <span class="text-[18px] text-[#909399] font-bold">菜单图标</span>
          <el-input v-model="cdtbdj" placeholder="请输入角色名称" class="w-[610px]"></el-input>
        </div>
        <!-- 路由地址 -->
        <div class="w-full flex justify-between items-center mt-[24px]">
          <span class="text-[18px] text-[#909399] font-bold">路由地址</span>
          <el-input v-model="lydzdj" placeholder="请输入角色名称" class="w-[610px]"></el-input>
        </div>
        <!-- 显示状态 -->
        <div class="w-full flex justify-between items-center mt-[24px]">
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">显示状态</span>
            <div class="ml-[30px]">
              <el-radio v-model="radiodj" label="0" class="text-[18px] text-[#909399]"
                >显示</el-radio
              >
              <el-radio v-model="radiodj" label="1" class="text-[18px] text-[#909399]"
                >隐藏</el-radio
              >
            </div>
          </div>
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">是否外联</span>
            <div class="ml-[30px]">
              <el-radio v-model="wliandj" label="0" class="text-[18px] text-[#909399]">是</el-radio>
              <el-radio v-model="wliandj" label="1" class="text-[18px] text-[#909399]">否</el-radio>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-between items-center mt-[24px]">
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">菜单状态</span>
            <div class="ml-[30px]">
              <el-radio v-model="cdztdj" label="0" class="text-[18px] text-[#909399]"
                >正常</el-radio
              >
              <el-radio v-model="cdztdj" label="1" class="text-[18px] text-[#909399]"
                >停用</el-radio
              >
            </div>
          </div>
        </div>
        <!-- 确定 -->
        <div class="mt-[46px] pl-[540px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="djsuccess">确定</el-button>
            <el-button>取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  //
  sysMenutreeSelect,
  sysMenulist,
  sysMenuadd,
  sysMenudelete,
  sysMenuedit,
} from '@/service';

const { log } = console;
export default {
  async created() {
    const menuManagement = await sysMenutreeSelect(2);
    this.tableData = menuManagement.data.data.menus;
    this.tableData22 = this.tableData;
    log(this.tableData22);
    const caidan = await sysMenulist();
    this.departmentlist = caidan.data.data;
  },
  data() {
    return {
      djxz: false,
      xiugaimb: false,
      mb: false,
      Nameinp: '',
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
      valuelb: '',
      tableData: [],
      tableData22: [],
      departmentlist: '',
      inputName: '',
      num: '1',
      cdtb: '',
      lydz: '',
      radio: '0',
      wlian: '0',
      cdzt: '0',
      selectedId: '',
      typexz: '',
      // 修改
      inputNamexg: '',
      numxg: '1',
      lydzxg: '',
      radioxg: '0',
      wlianxg: '0',
      cdztxg: '0',
      cdtbxg: '',
      xgid: '',
      // 点击新增
      inputNamedj: '',
      sjbm: '',
      numdj: '1',
      lydzdj: '',
      radiodj: '0',
      wliandj: '0',
      cdztdj: '0',
      cdtbdj: '',
    };
  },
  methods: {
    // 模糊查询
    searchUser() {
      // 调用搜索功能
      log(this.Nameinp);
      //   log('表格数据:', this.myuserlist);
      //   // 调用搜索功能，找出与 this.yhNameinp 相等的 nickName
      //   // 调用搜索功能，找出与 this.yhNameinp 相等的 nickName
      const filteredRows = this.tableData.filter((row) => row.label.includes(this.Nameinp.trim()));
      // //   // 输出符合条件的行信息
      log('符合条件的行信息:', filteredRows);
      this.tableData22 = filteredRows;
    },
    // 删除
    async shanchu(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 用户点击确定后执行的操作
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          // 执行删除操作
          const mydelete = await sysMenudelete(id);
          console.log(mydelete);
          // 重新加载页面
          window.location.reload();
        })
        .catch(() => {
          // 用户点击取消后执行的操作
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    handleButtonClick(type) {
      this.typexz = type;
      log('点击事件触发type:', this.typexz);
      // 在这里你可以根据 type 的值执行相应的逻辑
    },
    handleCascaderChange(value) {
      this.selectedId = value[value.length - 1];
      log('选中的 ID:', this.selectedId);
    },
    // 点击的新增
    async djsuccess() {
      const djadd = await sysMenuadd({
        create_by: 'admin',
        create_time: '2024-04-16T00:47:15.408Z',
        update_by: '020731',
        update_time: '2024-04-16T00:47:15.408Z',
        remark: '',
        beginTime: '2024-04-16T00:47:15.408Z',
        endTime: '2024-04-16T00:47:15.408Z',
        menuId: Math.round(Math.random() * 10000),
        menuName: this.inputNamedj,
        parentName: '',
        parentId: this.selectedId,
        orderNum: '0',
        path: this.lydzdj,
        component: '',
        isCache: '0',
        isFrame: '0',
        menuType: this.typexz,
        visible: this.radiodj,
        status: this.cdztdj,
        perms: '0',
        icon: this.cdtbdj,
      });
      log(djadd);
      this.djxz = false;
      window.location.reload();
    },
    // 修改
    async xgsuccess() {
      if (this.selectedId === '') {
        this.selectedId = 0;
        log(this.selectedId);
      }
      const myedit = await sysMenuedit({
        create_by: 'admin',
        create_time: '2024-04-16T03:06:23.105Z',
        update_by: '020731',
        update_time: '2024-04-16T03:06:23.105Z',
        remark: '',
        beginTime: '2024-04-16T03:06:23.105Z',
        endTime: '2024-04-16T03:06:23.105Z',
        menuId: this.xgid,
        menuName: this.inputNamexg,
        parentName: '',
        parentId: this.selectedId,
        orderNum: 0,
        path: this.lydzxg,
        component: '',
        isCache: '0',
        isFrame: '0',
        menuType: this.typexz,
        visible: this.radioxg,
        status: this.cdztxg,
        perms: '0',
        icon: this.cdtbxg,
      });
      log(myedit);
      this.xiugaimb = false;
      window.location.reload();
    },
    // 新增
    async scuess() {
      if (this.selectedId === '') {
        this.selectedId = 0;
        log(this.selectedId);
      }
      const myadd = await sysMenuadd({
        create_by: 'admin',
        create_time: '2024-04-16T00:47:15.408Z',
        update_by: '020731',
        update_time: '2024-04-16T00:47:15.408Z',
        remark: '',
        beginTime: '2024-04-16T00:47:15.408Z',
        endTime: '2024-04-16T00:47:15.408Z',
        menuId: Math.round(Math.random() * 10000),
        menuName: this.inputName,
        parentName: '',
        parentId: this.selectedId,
        orderNum: '0',
        path: this.lydz,
        component: '',
        isCache: '0',
        isFrame: '0',
        menuType: this.typexz,
        visible: this.radio,
        status: this.cdzt,
        perms: '0',
        icon: this.cdtb,
      });
      log(myadd);
      this.mb = false;
      window.location.reload();
    },
    dakai() {
      this.mb = true;
    },
    guanbimb() {
      this.mb = false;
    },
    xiugai(id) {
      this.xiugaimb = true;
      this.xgid = id;
    },
    guanbixg() {
      this.xiugaimb = false;
    },
    djxzgb() {
      this.djxz = false;
    },
    dkxzdj(row) {
      log(row.label);
      this.sjbm = row.label;
      this.selectedId = row.id;
      this.djxz = true;
      log(this.selectedId);
    },
    handleChange() {},
    getMenuData(row, dataType) {
      if (this.departmentlist) {
        const menu = this.departmentlist.find((obj) => obj.menuId === row.id);
        return menu ? menu[dataType] : '';
      }
      return '';
    },
  },
};
</script>

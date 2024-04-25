<template>
  <!-- 部门管理 -->
  <div class="px-[24px]">
    <!-- 部门搜索 -->
    <div class="w-full h-[90px]">
      <div class="w-[840px] h-[90px] flex items-center justify-between">
        <span class="text-[18px] text-[#606266] font-bold">部门名称</span>
        <el-input
          v-model="inputdeptname"
          placeholder="请输入部门名称"
          class="w-[243px] h-[40px]"
        ></el-input>
        <span class="text-[18px] text-[#606266] font-bold">状态</span>
        <el-select v-model="valuestate" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-row>
          <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]" @click="handleSearch">
            <div class="flex justify-around">
              <Icon icon="eva:search-fill" />
              <span>搜索</span>
            </div>
          </el-button>
          <el-button class="w-[92px]" @click="Reset">
            <div class="flex justify-around">
              <Icon icon="system-uicons:reset-alt" />
              <span>重置</span>
            </div>
          </el-button>
        </el-row>
      </div>
    </div>
    <!-- 新增 -->
    <div class="h-[60px] flex justify-between items-center">
      <el-button class="bg-[#13c2c2] text-[#fff] w-[92px]" @click="showmb">
        <div class="flex justify-around"><Icon icon="mingcute:add-fill" /><span>新增</span></div>
      </el-button>
      <div>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button icon="el-icon-search" circle></el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="tableDataCop"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="label" label="部门名称" sortable width="320"> </el-table-column>
        <el-table-column
          prop="name"
          label="负责人"
          sortable
          width="180"
          :formatter="(row) => departmentlist.find((obj) => obj.deptId === row.id).leader"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="排序"
          sortable
          width="180"
          :formatter="(row) => departmentlist.find((obj) => obj.deptId === row.id).orderNum"
        >
        </el-table-column>
        <el-table-column prop="name" label="状态" sortable width="400">
          <template v-slot="{ row }">
            <div v-if="departmentlist.find((obj) => obj.deptId === row.id).status == 0">正常</div>
            <div v-else>停用</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="创建时间"
          sortable
          width="200"
          :formatter="(row) => departmentlist.find((obj) => obj.deptId === row.id).createTime"
        >
        </el-table-column>
        <el-table-column prop="name" label="操作" sortable width="200">
          <template v-slot="scope">
            <el-button type="text">
              <div class="flex" @click="showmbxg(scope.row.id)">
                <Icon icon="solar:pen-2-bold" /><span>修改</span>
              </div>
            </el-button>
            <el-button type="text" @click="showmbTab(scope.row.label)">
              <div class="flex"><Icon icon="mingcute:add-fill" /><span>新增</span></div>
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
    <!-- 新增 表格 -->
    <div
      v-show="showMask"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white w-[750px] h-[512px] rounded-[10px] p-[24px]">
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">添加部门</div>
          <div @click="handleIconClick">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 上级部门 -->
        <div class="h-[47px] mt-[50px] flex justify-between items-center">
          <span class="text-[18px] text-[#909399] font-bold">上级部门</span>
          <el-select v-model="valueTab" placeholder="请选择" class="w-[614px]">
            <el-option
              v-for="item in tableData"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
          </el-select>
        </div>
        <!-- 部门名称 显示排序 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">部门名称</span>
            <el-input v-model="inputName" placeholder="请输入内容" class="w-[250px]"></el-input>
          </div>
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">显示排序</span>
            <el-input-number
              v-model="num"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="10"
              class="w-[250px]"
            ></el-input-number>
          </div>
        </div>
        <!-- 负责人 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">负责人</span>
            <el-input v-model="leader" placeholder="请输入负责人" class="w-[250px]"></el-input>
          </div>
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">联系电话</span>
            <el-input
              v-model="phoneNumber"
              placeholder="请输入联系电话"
              class="w-[250px]"
            ></el-input>
          </div>
        </div>
        <!-- 部门状态 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">邮箱</span>
            <el-input v-model="email" placeholder="请输入邮箱" class="w-[250px]"></el-input>
          </div>
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">部门状态</span>
            <div class="ml-[15px]">
              <el-radio v-model="radio" label="1" class="text-[18px] text-[#909399]">正常</el-radio>
              <el-radio v-model="radio" label="2" class="text-[18px] text-[#909399]">停用</el-radio>
            </div>
          </div>
        </div>
        <!-- 确定取消 -->
        <div class="mt-[76px] pl-[540px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="addDept()">确定</el-button>
            <el-button @click="handleIconClick">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 修改 -->
    <!-- 蒙版 -->
    <div
      v-show="showMaskxz"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white w-[750px] h-[512px] rounded-[10px] p-[24px]">
        <div class="flex justify-between">
          <div class="text-[22px] tetx-[#303133]">添加部门</div>
          <div @click="showmbxgguan">
            <Icon
              icon="emojione:heavy-multiplication-x"
              class="text-[12px] tetx-[#9a9da3] cursor-pointer"
            />
          </div>
        </div>
        <!-- 部门名称 显示排序 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">部门名称</span>
            <el-input v-model="inputNamexg" placeholder="请输入内容" class="w-[250px]"></el-input>
          </div>
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">显示排序</span>
            <el-input-number
              v-model="numxg"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="10"
              class="w-[250px]"
            ></el-input-number>
          </div>
        </div>
        <!-- 负责人 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">负责人</span>
            <el-input v-model="leaderxg" placeholder="请输入负责人" class="w-[250px]"></el-input>
          </div>
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">联系电话</span>
            <el-input
              v-model="phoneNumberxg"
              placeholder="请输入联系电话"
              class="w-[250px]"
            ></el-input>
          </div>
        </div>
        <!-- 部门状态 -->
        <div class="flex justify-between mt-[28px]">
          <div class="w-[340px] flex justify-between items-center">
            <span class="text-[18px] text-[#909399] font-bold">邮箱</span>
            <el-input v-model="emailxg" placeholder="请输入邮箱" class="w-[250px]"></el-input>
          </div>
          <div class="w-[340px] flex items-center">
            <span class="text-[18px] text-[#909399] font-bold">部门状态</span>
            <div class="ml-[15px]">
              <el-radio v-model="radioxg" label="1" class="text-[18px] text-[#909399]"
                >正常</el-radio
              >
              <el-radio v-model="radioxg" label="2" class="text-[18px] text-[#909399]"
                >停用</el-radio
              >
            </div>
          </div>
        </div>
        <!-- 确定取消 -->
        <div class="mt-[76px] pl-[540px]">
          <el-row>
            <el-button class="bg-[#13c2c2] text-[#fff]" @click="modify()">确定</el-button>
            <el-button @click="handleIconClick">取消</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { getlist, gettreeselect, newdept, newdeptxg, sysdeptId } from '@/service';

const { log } = console;
export default {
  async created() {
    // 自发 this指向当前自发进行的实例
    this.getFund();
  },
  data() {
    return {
      inputdeptname: '',
      showMask: false, // 控制蒙版是否显示的数据属性
      showMaskxz: false,
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
      // 表格新增
      valueTab: '',
      valuestate: '',
      departmentlist: [],
      tableData: [],
      tableDataCop: [],
      combinedData: [],
      // 备注
      remark: '',
      // 部门ID
      deptId: null,
      // 父部门
      parentDept: null,
      // 祖部门
      ancestors: '',
      // 部门名称
      inputName: '',
      // 排序号码
      num: 1,
      // 领导人
      leader: '',
      // 联系电话
      phoneNumber: '',
      // 电子邮箱
      email: '',
      // 部门状态
      radio: '1',
      // 删除标志
      delFlag: '0',
      // 修改的
      inputNamexg: '',
      leaderxg: '',
      numxg: '',
      phoneNumberxg: '',
      emailxg: '',
      radioxg: '1',
      xgid: '',
    };
  },
  methods: {
    async getFund() {
      const list = await getlist();
      const xiala = await gettreeselect();
      this.departmentlist = list.data.data;
      this.tableData = xiala.data.data;
      this.tableDataCop = this.tableData;
      log('部门列表', this.departmentlist);
      log('部门下拉树', this.tableData);
    },
    handleChange(value) {
      // 数字的加减
      log(value);
    },
    handleIconClick() {
      this.showMask = false;
    },
    // 新增
    showmb() {
      this.showMask = true;
    },
    // 表格新增
    showmbTab(label) {
      this.showMask = true;
      this.valueTab = label;
    },
    showmbxgguan() {
      this.showMaskxz = false;
    },
    showmbxg(id) {
      this.xgid = id;
      this.showMaskxz = true;
    },
    // 删除
    async deleteuserlit(id) {
      log(id);
      const deletea = await sysdeptId(id);
      log(deletea);
    },
    // 修改的确定
    async modify() {
      this.showMaskxz = false;
      const bbb = await newdeptxg({
        create_by: 'admin',
        create_time: new Date().toLocaleDateString,

        update_by: '13245',
        update_time: new Date().toLocaleDateString,
        remark: '',
        beginTime: '2024-04-09',
        endTime: '2024-04-09',
        deptId: this.xgid,
        parentId: Math.floor(Math.random() * 100000),
        ancestors: '',
        deptName: this.inputNamexg,
        orderNum: this.numxg,
        leader: this.leaderxg,
        phone: this.phoneNumberxg,
        email: this.emailxg,
        status: '0',
        delFlag: '0',
      });
      log(bbb);
    },
    // 新增、表格的确定
    async addDept() {
      this.showMask = false;
      const aaa = await newdept({
        create_by: 'admin',
        create_time: new Date().toLocaleDateString,
        update_by: '020816',
        update_time: new Date().toLocaleDateString,
        remark: '',
        beginTime: '2024-04-08',
        endTime: '2024-04-08',
        deptId: '112211',
        parentId: this.value,
        ancestors: '',
        deptName: this.inputName,
        orderNum: this.num,
        leader: this.leader,
        phone: this.phoneNumber,
        email: this.email,
        status: '1',
        delFlag: '0',
      });
      log(aaa);
    },

    // 搜索
    handleSearch() {
      // 获取部门名称
      log(this.inputdeptname);
      const filteredRows = this.tableData.filter((row) =>
        row.label.includes(this.inputdeptname.trim())
      );
      log(filteredRows);
      this.tableDataCop = filteredRows;
    },
    // 重置
    Reset() {
      this.inputdeptname = '';
      this.tableDataCop = this.tableData;
    },
  },
};
</script>

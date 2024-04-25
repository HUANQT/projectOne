<template>
  <el-container style="height: 100vh" class="flex">
    <!-- 导航 -->
    <el-aside class="bg-[#304156] text-white" :style="{ width: asideWidth }">
      <el-header class="bg-[#304156] pl-5 text-white text-[20px] overflow-hidden aside-transition">
        <div class="w-[100%] h-8 mt-[30px] whitespace-normal overflow-hidden">西藏阜康肿瘤医院</div>
      </el-header>
      <!-- 导航侧边栏 -->
      <el-menu
        :unique-opened="true"
        :router="true"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#1f80a9"
        :style="{ width: asideWidth_ul }"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <dynamicMenu :menus="$store.state.menus" />
      </el-menu>
    </el-aside>
    <!-- 内容 -->
    <el-container>
      <el-header class="main_head p-[0px]">
        <div class="h-[60px] flex justify-between px-[22px]">
          <!-- 点击收缩 -->
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <div class="flex items-center" @click="navShrink">
              <Icon icon="fluent:navigation-unread-20-filled" class="text-[20px] mt-[21px]" />
            </div>
          </el-radio-group>

          <div class="flex">
            <Icon
              icon="material-symbols:search"
              class="text-[20px] mt-[21px] ml-[10px] text-[#7e8187]"
            />
            <Icon
              icon="ic:baseline-zoom-out-map"
              class="text-[20px] mt-[21px] ml-[10px] text-[#7e8187]"
            />
            <Icon icon="carbon:text-scale" class="text-[20px] mt-[21px] ml-[10px] text-[#7e8187]" />
            <div class="bg-[#009b85] w-[36px] h-[36px] mt-[10px] ml-[10px] rounded-[50%] relative">
              <img
                src="../../public/logo.jpg"
                class="w-[28px] h-[28px] rounded-[50%] absolute top-[4px] left-[4px]"
              />
            </div>
            <el-dropdown @command="handleCommand">
              <i class="el-icon-arrow-down el-icon--right pt-10"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item command="e">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="flex py-[3px] px-[20px] shadow-md border-t border-b border-[#d8dce5]">
          <div class="border-[1px] px-[10px] py-[3px]">首页</div>
          <div class="flex border-[1px] px-[10px] py-[3px] ml-[10px] text-white bg-[#13c2c2]">
            <Icon icon="material-symbols:circle" class="mt-[8px] text-[10px]" />
            <span class="ml-[10px]">{{}}</span>
            <Icon icon="streamline:delete-1" class="ml-[10px] mt-[10px] text-[8px]" />
          </div>
        </div>
      </el-header>
      <el-main class="p-[0]">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { adminInfo } from '@/service';
import dynamicMenu from '@/components/dynamicMenu.vue';

const { log } = console;
export default {
  data() {
    return {
      isCollapse: false,
      asideWidth: '250px',
      asideWidth_ul: '251px',
    };
  },
  components: { dynamicMenu },
  async created() {
    const res = await adminInfo();
    log('Layout', res);
  },
  methods: {
    // 退出登录
    handleCommand(command) {
      if (command === 'e') {
        window.localStorage.setItem('token', '');
        // 刷新页面
        window.location.reload();
      }
    },
    // 侧边栏收缩
    navShrink() {
      this.asideWidth = this.asideWidth === '250px' ? '50px' : '250px';
      this.asideWidth_ul = this.asideWidth_ul === '251px' ? '51px' : '251px';

      if (!this.isCollapse) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
    navTitle() {},
  },
};
</script>

<style scoped>
::v-deep .el-menu-item {
  color: white;
  width: 246px;
}
::v-deep .el-submenu__title {
  color: white;
  display: flex;
}
::v-deep .el-menu-item:hover,
::v-deep .el-submenu__title:hover {
  background-color: #001528;
  color: #13c2c2;
}
.rigth_body {
  width: 1280px !important;
}
.main_head {
  height: 107px !important;
}
.hide-vertical-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
/* 兼容Chrome, Safari和Opera等浏览器 */
::-webkit-scrollbar {
  display: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.aside-transition {
  transition: all 0.3s ease;
}
</style>

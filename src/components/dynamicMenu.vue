<script>
// 递归组件的使用
export default {
  // 递归要写名
  name: 'dynamic-menu',
  props: {
    menus: {
      type: Array,
      required: true,
    },
    prefix: {
      type: String,
      default: '',
    },
  },
};
</script>
<template>
  <div>
    <div v-for="item in menus" :key="item.name">
      <el-submenu
        :index="`${prefix}${prefix ? '/' : ''}${item.path}`"
        v-if="Array.isArray(item.children) && item.children.length > 0"
        class="bg-[#304156]"
      >
        <template v-slot:title>
          <div class="flex items-center">
            <i class="el-icon-eleme mx-1 block"></i>
            <span>{{ item.meta.title }}</span>
          </div>
        </template>
        <dynamic-menu
          :menus="item.children"
          :prefix="`${prefix}${prefix ? '/' : ''}${item.path}`"
        />
      </el-submenu>
      <el-menu-item
        v-else
        :index="`${prefix}${prefix ? '/' : ''}${item.path}`"
        class="bg-[#1f2d3d]"
      >
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </div>
  </div>
</template>

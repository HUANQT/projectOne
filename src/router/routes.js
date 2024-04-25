import login from '@/views/login.vue';

// 角色和权限：
// 假如项目中总页面的数量为5个（A、B、C、D、E）
// 项目中有3个角色（普通用户（A）、管理员（A、B）、超级管理员（A、B、C、D、E））
// 静态路由
// 通过后端接口数据 自己去构建的路由配置 动态路由
const routes = [
  { path: '/', redirect: '/login' },
  { name: 'login', path: '/login', component: login },
];

export default routes;

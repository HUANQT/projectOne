/* eslint-disable nonblock-statement-body-position */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import VueRouter from 'vue-router';
import storejs from 'storejs';
import { Notification } from 'element-ui';
import routes from './routes';
import buildDynamicRoutes from './routes.dynamic';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
});
// 路由跳转拦截（在每一次跳转之前）
router.beforeEach((to, from, next) => {
  // 计算当前的总路由computedRoutes
  const computedRoutes = router.getRoutes();
  // 如果当前跳转的目标路由的路径在computedRoutes中则放行跳转
  if (computedRoutes.findIndex((item) => item.path === to.path) >= 0) {
    return next();
  }
  // 检测是否登录检测条件为是否存在token（该判断条件不够全面比如：token存在但是被篡改或其他人登录造成我的token失效该情况需要服务端检验返回401）
  // 后面的情况的逻辑在请求的响应拦截里处理
  if (!storejs.get('token')) {
    Notification.error('未找到该页面');
    return next('/login');
  }
  // 如果token存在但是动态路由不完整 则构建之后在跳转
  if (computedRoutes.length <= routes.length) {
    buildDynamicRoutes(router);
    return next(to.path);
  }
  next();
});

export default router;

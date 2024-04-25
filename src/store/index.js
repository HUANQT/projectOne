/* eslint-disable no-param-reassign */
// 状态管理工具的作用：在项目多个页面或组件中共享数据（响应式的）
// vue对应的状态管理工具：vuex（vue@2.x - vuex@3.x）
// 状态管理工具：集中管理的 data（state）+computed（getters）+methods（mutations/actions）
// vue-router和vuex都是vue的插件
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { adminMenu } from '@/service';
// import buidDynamicRoutes from '@/router/routes.dynamic';
// import router from '@/router';

Vue.use(Vuex);
// 实例化store
const store = new Vuex.Store({
  // 相当于组件的data选项 但是state是供项目的所有的组件消费的
  state: {
    menus: [],
  },
  // 相当于组件的computed选项 但是getters是供项目的所有的组件消费的
  getters: {},
  // 相当于组件的methods选项 但是mutations是供项目的所有的组件消费的
  mutations: {
    // 在mutations中定义的所有方法中的第一个参数 指向的state
    updateMenus(state, menus) {
      state.menus = menus;
      // buidDynamicRoutes(menus);
      // console.log(router.getRoutes());
      // router.push('/system/user');
    },
  },
  // 相当于组件的methods选项 但是actions是供项目的所有的组件消费的
  actions: {
    // actions中定义的函数的第一个参数指向“store实例”
    // 获取用户菜单列表
    async getAdminMenns(_store) {
      const res = await adminMenu();
      _store.commit('updateMenus', res.data.data);
    },
  },
  plugins: [
    // 数据持久化
    createPersistedState({
      key: 'hospital_vuex_state',
      paths: ['menus'],
    }),
  ],
});

// 对于的状态的修改：同步修改和异步修改
// 同步修改数据：mutaions
// 异步修改数据：actions（走异步流程） + mutations
// store.commit触发mutaions （mustaions函数中的第一个参数为state）
// store.dispatch触发actions （actions函数中的第一个参数为store）

export default store;

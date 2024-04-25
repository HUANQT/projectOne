/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import storejs from 'storejs';

import Error_404 from '@/views/404.vue';

let pages = [];
function updateRoutesComponent(list) {
  list.forEach((route) => {
    route.component = pages[route.component];
    if (Array.isArray(route.children) && route.children.length > 0) {
      updateRoutesComponent(route.children);
    }
  });
}

export default (router) => {
  const menus = storejs.get('hospital_vuex_state')?.menus ?? [];
  const views = import.meta.glob('@/views/**/*.vue');
  pages = Object.entries(views).reduce((prev, [url, component]) => {
    const path = url.replace('/src/views/', '').replace('.vue', '');
    prev[path] = component;
    return prev;
  }, {});
  updateRoutesComponent(menus);
  menus.forEach((route) => router.addRoute(route));
  router.addRoute({
    path: '*',
    component: Error_404,
  });
};

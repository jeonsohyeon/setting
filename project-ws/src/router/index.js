import Vue from 'vue';
import Router from 'vue-router';
import IndexPage from '@/components/IndexPage';

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    }
  ]
});

Vue.use(Router);

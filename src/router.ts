import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/PictureToBase64',
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/PictureToBase64',
      name: 'PictureToBase64',
      component: () =>
        import(
          /* webpackChunkName: "PictureToBase64" */ './views/features/picture-to-base64.vue'
        ),
    },
    {
      path: '/StringConversion',
      name: 'StringConversion',
      component: () =>
        import(
          /* webpackChunkName: "PictureToBase64" */ './views/features/string-conversion'
        ),
    },
  ],
});

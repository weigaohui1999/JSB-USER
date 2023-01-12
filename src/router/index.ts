import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Home/index.vue"),
  },
  {
    path: "/business",
    name: "business",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "business" */ "../views/Business/index.vue"),
  },
  {
    path: "/commossion",
    name: "commossion",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "commossion" */ "../views/Commossion/index.vue"
      ),
  },
  {
    path: "/progress",
    name: "progress",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "progress" */ "../views/Progress/index.vue"),
  },
  {
    path: "/guide",
    name: "guide",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "progress" */ "../views/Guide/index.vue"),
  },
  {
    path: "*",
    redirect: "/home",
  },
];

const router = new VueRouter({
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import BarsIndex from "../views/BarsIndex.vue";
import CrawlsIndex from "../views/CrawlsIndex.vue";
import CrawlsNew from "../views/CrawlsNew.vue";
import CrawlsShow from "../views/CrawlsShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/bars", name: "bars-index", component: BarsIndex },
  { path: "/crawls", name: "crawls-index", component: CrawlsIndex },
  { path: "/crawls/new", name: "crawls-new", component: CrawlsNew },
  { path: "/crawls/:id", name: "crawls-show", component: CrawlsShow },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

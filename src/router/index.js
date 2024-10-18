import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    name: "quote",
    path: "/",
    component: () => import("@/views/GemerQuote.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

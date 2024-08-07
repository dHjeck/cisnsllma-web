export default {
  path: "/LLMA",
  redirect: "/LLMA/scan",
  meta: {
    icon: "iconamoon:search-duotone",
    title: "LLMA目录",
    // showLink: false,
    rank: 10
  },
  children: [
    {
      path: "/LLMA/scan",
      name: "scan",
      component: () => import("@/views/LLMA/start.vue"),
      meta: {
        title: "扫描"
      }
    },
    {
      path: "/LLMA/result",
      name: "结果",
      component: () => import("@/views/LLMA/result.vue"),
      meta: {
        title: "结果"
      }
    },
    {
      path: "/LLMA/test",
      name: "test",
      component: () => import("@/views/LLMA/test.vue"),
      meta: {
        title: "test"
      }
    },
    {
      path: "/LLMA/chat",
      name: "chat",
      component: () => import("@/views/LLMA/chat.vue"),
      meta: {
        title: "chat"
      }
    }
  ]
} as RouteConfigsTable;

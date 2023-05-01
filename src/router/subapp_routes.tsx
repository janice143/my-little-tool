import "./subStyle.less";

const subapp_routes = [
  {
    path: "/citation",
    element: () => import("@/pages/citation-gene"),
  },
  {
    path: "/gene-ankiDecker",
    element: () => import("@/pages/gene-ankiDecker"),
  },
];

subapp_routes.forEach((routItem) => {
  routItem.path = `${routItem.path}`;
});

// 用于本地项目自启动
export const subappRoutes = subapp_routes;

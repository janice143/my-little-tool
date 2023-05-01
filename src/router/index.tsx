import React, { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import { subappRoutes } from "./subapp_routes";
import NotFound from "@/pages/not-found";

const routes = [
  {
    path: "/home",
    element: () => import("@/pages/home"),
  },
  ...subappRoutes,
];
const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {routes.map(({ path, element }) => {
        // @ts-ignore ignore
        const Comp = lazy(element);
        return <Route path={path} key={path} element={<Comp />} />;
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>
);

export default Router;

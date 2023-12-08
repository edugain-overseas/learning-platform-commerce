import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<div>Home Page</div>} />
        <Route path="/*" element={<div>Not Found Page</div>} />
      </Route>
    </Routes>
  );
};

export default Router;

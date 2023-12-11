import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";
import SingUpForm from "./auth/SingUpForm/SingUpForm";
import SingInForm from "./auth/SingInForm/SingInForm";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<div>Home Page</div>} />
        <Route path="/registration" element={<SingUpForm />} />
        <Route path="/login" element={<SingInForm />} />
        <Route path="/*" element={<div>Not Found Page</div>} />
      </Route>
    </Routes>
  );
};

export default Router;

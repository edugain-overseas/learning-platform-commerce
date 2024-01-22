import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout/MainLayout";
import SingUpForm from "./auth/SingUpForm/SingUpForm";
import SingInForm from "./auth/SingInForm/SingInForm";
import CreateLessonModal from "./CreateLessonModal/CreateLessonModal";
import CoursesPage from "../pages/CoursesPage/CoursesPage";
import CategoriesList from "./CategoriesList/CategoriesList";
import CategoryDetailPage from "../pages/CategoryDetailPage/CategoryDetailPage";
import CourseDetailPage from "../pages/CourseDetailPage/CourseDetailPage";
import { coursesLinks } from "../costants/nav";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<CreateLessonModal />} />
        <Route path="/registration" element={<SingUpForm />} />
        <Route path="/login" element={<SingInForm />} />
        <Route path="/courses" element={<CoursesPage />}>
          {coursesLinks.map(({ to }) => (
            <Route key={to} path={to} element={<CategoriesList />} />
          ))}
          <Route path=":courseId" element={<CourseDetailPage />} />
          <Route path="category/:categoryId" element={<CategoryDetailPage />} />
        </Route>
        <Route path="/*" element={<div>Not Found Page</div>} />
      </Route>
    </Routes>
  );
};

export default Router;
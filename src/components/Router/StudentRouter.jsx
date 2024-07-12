import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  courseLinks,
  coursesLinks,
  instructionsLinks,
} from "../../costants/nav";
import MainLayout from "../MainLayout/MainLayout";
import SingUpForm from "../auth/SingUpForm/SingUpForm";
import SingInForm from "../auth/SingInForm/SingInForm";
import CreateLessonModal from "../CreateLessonModal/CreateLessonModal";
import CoursesPage from "../../pages/CoursesPage/CoursesPage";
import CategoriesList from "../CategoriesList/CategoriesList";
import CategoryDetailPage from "../../pages/CategoryDetailPage/CategoryDetailPage";
import CourseDetailPage from "../../pages/CourseDetailPage/CourseDetailPage";
import TaskPage from "../../pages/TaskPage/TaskPage";
import UserProfilePage from "../../pages/UserProfilePage/UserProfilePage";
import AboutIEUPage from "../../pages/AboutIEUPage/AboutIEUPage";
import InstructionsPage from "../../pages/InstructionsPage/InstructionsPage";
import InstructionsList from "../InstructionsList/InstructionsList";
import InstructionContent from "../InstructionContent/InstructionContent";
// import AdminCourseConstructorPage from "../../pages/AdminCourseConstructorPage/AdminCourseConstructorPage";

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
          <Route path="category/:categoryId" element={<CategoryDetailPage />} />
        </Route>
        <Route path="/course/:courseId" element={<CourseDetailPage />}>
          {courseLinks.map(({ to, element }) => (
            <Route key={to} path={to} element={element} />
          ))}
        </Route>
        <Route path="/task/:taskId" element={<TaskPage />} />
        <Route path="/me" element={<UserProfilePage />} />
        <Route path="/aboutIEU" element={<AboutIEUPage />} />
        <Route path="/instructions" element={<InstructionsPage />}>
          {instructionsLinks.map(({ to }) => (
            <Route path={to} key={to} element={<InstructionsList />}>
              <Route path=":instructionId" element={<InstructionContent />} />
            </Route>
          ))}
        </Route>
        <Route path="/*" element={<div>Not Found Page</div>} />
        {/* <Route path="/*" element={<AdminCourseConstructorPage />} /> */}
      </Route>
    </Routes>
  );
};

export default Router;

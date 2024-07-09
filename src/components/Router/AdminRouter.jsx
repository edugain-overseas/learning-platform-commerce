import React from "react";
import { Route, Routes } from "react-router-dom";
import { adminCourseLinks, instructionsLinks } from "../../costants/nav";
import AdminPage from "../../pages/AdminPage/AdminPage";
import MainLayout from "../MainLayout/MainLayout";
import SingInForm from "../auth/SingInForm/SingInForm";
import AdminCoursesDashboard from "../../pages/AdminCoursesDashboard/AdminCoursesDashboard";
import AboutIEUPage from "../../pages/AboutIEUPage/AboutIEUPage";
import InstructionsPage from "../../pages/InstructionsPage/InstructionsPage";
import InstructionsList from "../InstructionsList/InstructionsList";
import InstructionContent from "../InstructionContent/InstructionContent";
import AdminCourseConstructorPage from "../../pages/AdminCourseConstructorPage/AdminCourseConstructorPage";
import CourseDetailPage from "../../pages/CourseDetailPage/CourseDetailPage";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="/login" element={<SingInForm />} />
        <Route path="/courses" element={<AdminCoursesDashboard />}></Route>
        <Route path="/course">
          <Route
            path="constructor/new"
            element={<AdminCourseConstructorPage />}
          />
          <Route path=":courseId" element={<CourseDetailPage />}>
            {adminCourseLinks.map(({ to, element }) => (
              <Route key={to} path={to} element={element} />
            ))}
          </Route>
        </Route>
        <Route path="/aboutIEU" element={<AboutIEUPage />} />
        <Route path="/instructions" element={<InstructionsPage />}>
          {instructionsLinks.map(({ to }) => (
            <Route path={to} key={to} element={<InstructionsList />}>
              <Route path=":instructionId" element={<InstructionContent />} />
            </Route>
          ))}
        </Route>

        <Route path="/*" element={<div>Not Found Page</div>} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;

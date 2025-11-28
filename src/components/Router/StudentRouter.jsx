import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  courseLinks,
  instructionsLinks,
} from "../../costants/nav";
import MainLayout from "../MainLayout/MainLayout";
import HomePage from "../../pages/HomePage/HomePage";
const SingUpForm = React.lazy(() => import("../auth/SingUpForm/SingUpForm"));
const SingInForm = React.lazy(() => import("../auth/SingInForm/SingInForm"));
const CoursesPage = React.lazy(() =>
  import("../../pages/CoursesPage/CoursesPage")
);
const CategoriesList = React.lazy(() =>
  import("../CategoriesList/CategoriesList")
);
const CourseDetailPage = React.lazy(() =>
  import("../../pages/CourseDetailPage/CourseDetailPage")
);
const TaskPage = React.lazy(() => import("../../pages/TaskPage/TaskPage"));
const UserProfilePage = React.lazy(() =>
  import("../../pages/UserProfilePage/UserProfilePage")
);
const AboutIEUPage = React.lazy(() =>
  import("../../pages/AboutIEUPage/AboutIEUPage")
);
const InstructionsPage = React.lazy(() =>
  import("../../pages/InstructionsPage/InstructionsPage")
);
const InstructionsList = React.lazy(() =>
  import("../InstructionsList/InstructionsList")
);
const InstructionContent = React.lazy(() =>
  import("../InstructionContent/InstructionContent")
);
const PaymentPage = React.lazy(() =>
  import("../../pages/PaymentPage/PaymentPage")
);

const StudentRouter = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/registration" element={<SingUpForm />} />
      <Route path="/login" element={<SingInForm />} />
      <Route path="/courses" element={<CoursesPage />}>
        <Route index element={<Navigate to="all" replace />} />
        <Route path=":filter" element={<CategoriesList />} />
      </Route>
      <Route path="/course/:courseId" element={<CourseDetailPage />}>
        {courseLinks.map(({ to, element }) => (
          <Route key={to} path={to} element={element} />
        ))}
      </Route>
      <Route path="/task/:taskId" element={<TaskPage />} />
      <Route path="/education" element={<CoursesPage />}>
        <Route index element={<Navigate to="all" replace />} />
        <Route path=":filter" element={<CategoriesList />} />
      </Route>
      <Route path="/me" element={<UserProfilePage />} />
      <Route path="/aboutIEU" element={<AboutIEUPage />} />
      <Route path="/instructions" element={<InstructionsPage />}>
        {instructionsLinks.map(({ to }) => (
          <Route path={to} key={to} element={<InstructionsList />}>
            <Route path=":instructionId" element={<InstructionContent />} />
          </Route>
        ))}
      </Route>
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/*" element={<div>Not Found Page</div>} />
    </Route>
  </Routes>
);

export default StudentRouter;

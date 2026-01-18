import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { adminCourseLinks, instructionsLinks } from "../../costants/nav";
import Root from "../Root";

const AdminPage = React.lazy(() => import("../../pages/AdminPage/AdminPage"));
const SingInForm = React.lazy(() => import("../auth/SingInForm/SingInForm"));
const AdminCoursesDashboard = React.lazy(() =>
  import("../../pages/AdminCoursesDashboard/AdminCoursesDashboard")
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
const AdminCourseConstructorPage = React.lazy(() =>
  import("../../pages/AdminCourseConstructorPage/AdminCourseConstructorPage")
);
const CourseDetailPage = React.lazy(() =>
  import("../../pages/CourseDetailPage/CourseDetailPage")
);
const TaskConstructor = React.lazy(() =>
  import("../TaskConstructor/TaskContructor")
);

export const adminRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<AdminPage />} />
      <Route path="/login" element={<SingInForm />} />
      <Route path="/courses" element={<AdminCoursesDashboard />} />
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
      <Route path="/task/:taskId" element={<TaskConstructor />} />
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
  )
);

// const AdminRouter = () => (
//   <Routes>
//     <Route path="/" element={<MainLayout />}>
//       <Route index element={<AdminPage />} />
//       <Route path="/login" element={<SingInForm />} />
//       <Route path="/courses" element={<AdminCoursesDashboard />} />
//       <Route path="/course">
//         <Route
//           path="constructor/new"
//           element={<AdminCourseConstructorPage />}
//         />
//         <Route path=":courseId" element={<CourseDetailPage />}>
//           {adminCourseLinks.map(({ to, element }) => (
//             <Route key={to} path={to} element={element} />
//           ))}
//         </Route>
//       </Route>
//       <Route path="/task/:taskId" element={<TaskConstructor />} />
//       <Route path="/aboutIEU" element={<AboutIEUPage />} />
//       <Route path="/instructions" element={<InstructionsPage />}>
//         {instructionsLinks.map(({ to }) => (
//           <Route path={to} key={to} element={<InstructionsList />}>
//             <Route path=":instructionId" element={<InstructionContent />} />
//           </Route>
//         ))}
//       </Route>
//       <Route path="/*" element={<div>Not Found Page</div>} />
//     </Route>
//   </Routes>
// );

// export default AdminRouter;

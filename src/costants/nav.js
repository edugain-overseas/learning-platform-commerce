import { ReactComponent as HomeIcon } from "../images/icons/home.svg";
import { ReactComponent as CoursesIcon } from "../images/icons/courses.svg";
import { ReactComponent as MyProfileIcon } from "../images/icons/myProfile.svg";
import { ReactComponent as AboutIEUIcon } from "../images/icons/aboutIEU.svg";
import { ReactComponent as InstructionsIcon } from "../images/icons/instructions.svg";
import CourseIntroPage from "../pages/CourseDetailPage/CourseIntroPage/CourseIntroPage";
import CourseTasksPage from "../pages/CourseDetailPage/CourseTasksPage/CourseTasksPage";
import CourseCerificatePage from "../pages/CourseDetailPage/CourseCerificatePage/CourseCerificatePage";
import AdminCourseEditPage from "../pages/AdminCourseEditPage/AdminCourseEditPage";
import CoursePublishPage from "../pages/CourseDetailPage/CoursePublishPage/CoursePublishPage";

export const sidebarNav = [
  { label: "Home", icon: <HomeIcon />, link: "/", children: null },
  {
    label: "Courses",
    icon: <CoursesIcon />,
    link: "/courses/available",
    children: null,
  },
  {
    label: "My education",
    icon: <CoursesIcon />,
    link: "/courses/available",
    children: null,
  },
  { label: "My profile", icon: <MyProfileIcon />, link: "/me", children: null },
  {
    label: "About IEU",
    icon: <AboutIEUIcon />,
    link: "/aboutIEU",
    children: null,
  },
  {
    label: "Instructions",
    icon: <InstructionsIcon />,
    link: "/instructions/general",
    children: null,
  },
];

export const adminSidebarNav = [
  { label: "Home", icon: <HomeIcon />, link: "/", children: null },
  {
    label: "Courses",
    icon: <CoursesIcon />,
    link: "/courses",
    children: null,
  },
  {
    label: "About IEU",
    icon: <AboutIEUIcon />,
    link: "/aboutIEU",
    children: null,
  },
  {
    label: "Instructions",
    icon: <InstructionsIcon />,
    link: "/instructions/general",
    children: null,
  },
];

export const coursesLinks = [
  {
    to: "my",
    content: `my courses`,
  },
  {
    to: "available",
    content: "available courses",
  },
  {
    to: "completed",
    content: "completed courses",
  },
];

export const coursesLinksPublic = [
  {
    to: "available",
    content: "available courses",
  },
];

export const adminCourseLinks = [
  {
    to: "intro",
    content: `intro`,
    element: <CourseIntroPage />,
  },
  {
    to: "tasks",
    content: "tasks",
    element: <CourseTasksPage />,
  },
  {
    to: "publish",
    content: "publish",
    element: <CoursePublishPage />,
  },
  // {
  //   to: "exam-certificate",
  //   content: "exam | certificate",
  //   element: <CourseCerificatePage />,
  // },
  {
    to: "constructor",
    content: "Edit",
    element: <AdminCourseEditPage />,
  },
];

export const courseLinks = [
  {
    to: "intro",
    content: `intro`,
    element: <CourseIntroPage />,
  },
  {
    to: "tasks",
    content: "tasks",
    element: <CourseTasksPage />,
  },
  {
    to: "exam-certificate",
    content: "exam | certificate",
    element: <CourseCerificatePage />,
  },
];

export const courseLinksPublic = [
  {
    to: "intro",
    content: `intro`,
    element: <CourseIntroPage />,
  },
];

export const instructionsLinks = [
  {
    to: "general",
    content: "general instruction",
  },
  {
    to: "courses",
    content: "instruction courses",
  },
];

import { ReactComponent as HomeIcon } from "../images/icons/nav/home.svg";
import { ReactComponent as CoursesIcon } from "../images/icons/nav/all-courses.svg";
import { ReactComponent as EducationIcon } from "../images/icons/nav/my-education.svg";
import { ReactComponent as MyProfileIcon } from "../images/icons/nav/my-profile.svg";
import { ReactComponent as AboutIEUIcon } from "../images/icons/nav/about.svg";
import { ReactComponent as InstructionsIcon } from "../images/icons/nav/instruction.svg";
import CourseIntroPage from "../pages/CourseDetailPage/CourseIntroPage/CourseIntroPage";
import CourseTasksPage from "../pages/CourseDetailPage/CourseTasksPage/CourseTasksPage";
import CourseCerificatePage from "../pages/CourseDetailPage/CourseCerificatePage/CourseCerificatePage";
import AdminCourseEditPage from "../pages/AdminCourseEditPage/AdminCourseEditPage";
import CoursePublishPage from "../pages/CourseDetailPage/CoursePublishPage/CoursePublishPage";

export const sidebarNav = [
  { label: "Home", icon: <HomeIcon />, link: "/", children: null },
  {
    label: "All Courses",
    icon: <CoursesIcon />,
    link: "/courses",
    children: null,
  },
  {
    label: "My education",
    icon: <EducationIcon />,
    link: "/education",
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
    to: "all",
    content: `All`,
  },
  {
    to: "short",
    content: "Short Courses",
  },
  {
    to: "long",
    content: "Long Courses",
  },
];

export const educationLinks = [
  {
    to: "in-progress",
    content: "In Progress",
  },
  {
    to: "completed",
    content: "Completed",
  },
  {
    to: "all",
    content: "All Courses",
  },
];

export const adminCourseLinks = [
  {
    to: "intro",
    content: `Intro`,
    element: <CourseIntroPage />,
  },
  {
    to: "tasks",
    content: "Tasks",
    element: <CourseTasksPage />,
  },
  {
    to: "publish",
    content: "Publish",
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
    content: `Intro`,
    element: <CourseIntroPage />,
  },
  {
    to: "tasks",
    content: "Tasks",
    element: <CourseTasksPage />,
  },
  {
    to: "exam-certificate",
    content: "Exam | Certificate",
    element: <CourseCerificatePage />,
  },
];

export const courseLinksPublic = [
  {
    to: "intro",
    content: `Intro`,
    element: <CourseIntroPage />,
  },
];

export const instructionsLinks = [
  {
    to: "general",
    content: "General Instruction",
  },
  {
    to: "courses",
    content: "Instruction Courses",
  },
];

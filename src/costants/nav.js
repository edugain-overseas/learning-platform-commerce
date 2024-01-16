import { ReactComponent as HomeIcon } from "../images/icons/home.svg";
import { ReactComponent as CoursesIcon } from "../images/icons/courses.svg";
import { ReactComponent as MyProfileIcon } from "../images/icons/myProfile.svg";
import { ReactComponent as AboutIEUIcon } from "../images/icons/aboutIEU.svg";
import { ReactComponent as InstructionsIcon } from "../images/icons/instructions.svg";

export const sidebarNav = [
  { label: "Home", icon: <HomeIcon />, link: "/", children: null },
  {
    label: "Courses",
    icon: <CoursesIcon />,
    link: "/courses/my",
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
    label: "Instruction",
    icon: <InstructionsIcon />,
    link: "/instruction",
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

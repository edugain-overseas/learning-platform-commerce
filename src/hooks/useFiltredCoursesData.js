import { useSelector } from "react-redux";
import { getAllCourses } from "../redux/course/selectors";
import { getAllCategories } from "../redux/category/selectors";
import { useLocation, useParams } from "react-router-dom";

const getFilterCourses = (courses, filter) => {
  const coursesAvailableForPurchase = courses.filter(
    (course) => !course.bought
  );

  switch (filter) {
    case "all":
      return coursesAvailableForPurchase;
    case "short":
      return coursesAvailableForPurchase.filter(
        (course) => course.type === "short"
      );
    case "long":
      return coursesAvailableForPurchase.filter(
        (course) => course.type === "long"
      );
    default:
      return courses;
  }
};

const getFilterEducationCourses = (courses, filter) => {
  const userCourses = courses.filter((course) => course.bought);

//   console.log(filter);
  switch (filter) {
    case "all":
      return userCourses;
    case "in-progress":
      return userCourses.filter(
        (course) => 0 <= course.progress && course.progress < 100
      );
    case "completed":
      return userCourses.filter((course) => course.progress === 100);
    default:
      return courses;
  }
};

export const useFilteredCoursesData = () => {
  const courses = useSelector(getAllCourses);
  const categories = useSelector(getAllCategories);

//   console.log(courses);
//   console.log(categories);

  const { filter } = useParams();
  const { pathname } = useLocation();

  const isEducationPage = pathname.includes("education");

//   console.log(filter);

  const filtredCourses = isEducationPage
    ? getFilterEducationCourses(courses, filter)
    : getFilterCourses(courses, filter);

  const filtredCategories = categories.filter((category) =>
    filtredCourses?.find((course) => course.category_id === category.id)
  );

  const coursesAvailableForPurchase = isEducationPage
    ? courses.filter((course) => !course.bought)
    : [];

//   console.log(filtredCourses);

  return {
    categories: filtredCategories,
    courses: [...filtredCourses, ...coursesAvailableForPurchase],
  };
};

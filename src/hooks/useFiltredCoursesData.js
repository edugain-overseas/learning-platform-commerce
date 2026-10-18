import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getAllCourses } from "../redux/course/selectors";
import { getAllCategories } from "../redux/category/selectors";
import { useLocation, useParams } from "react-router-dom";

const getFilterCourses = (courses, filter) => {
  const coursesAvailableForPurchase = courses.filter(
    (course) => !course.bought,
  );

  switch (filter) {
    case "all":
      return coursesAvailableForPurchase;
    case "short":
      return coursesAvailableForPurchase.filter(
        (course) => course.type === "short",
      );
    case "long":
      return coursesAvailableForPurchase.filter(
        (course) => course.type === "long",
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
        (course) => 0 <= course.progress && course.progress < 100,
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

  const { filter } = useParams();
  const { pathname } = useLocation();

  const isEducationPage = pathname.includes("education");

  const filtredCourses = isEducationPage
    ? getFilterEducationCourses(courses, filter)
    : getFilterCourses(courses, filter);

  const otherCourses = isEducationPage
    ? courses.filter((course) => !course.bought)
    : [...courses.filter((course) => course.bought)].sort((a, b) => {
        const getCourseWeight = (course) => {
          const inProgress = course.progress < 100;
          if (inProgress) return 1;
          return 2;
        };
        return getCourseWeight(a) - getCourseWeight(b);
      });

  const sortedCourses = [...filtredCourses, ...otherCourses];

  const filtredCategories = useMemo(() => {
    const activeCategories = categories.filter((category) =>
      filtredCourses?.some((course) => course.category_id === category.id),
    );

    return [...activeCategories].sort((a, b) => {
      const aCourses = sortedCourses.filter(
        (course) => course.category_id === a.id,
      );
      const bCourses = sortedCourses.filter(
        (course) => course.category_id === b.id,
      );

      const getCategoryWeight = (coursesList) => {
        const hasInProgress = coursesList.some(
          (c) => c.progress && c.progress < 100,
        );
        const hasCompleted = coursesList.some(
          (c) => c.progress && c.progress === 100,
        );

        if (hasInProgress) return 1;
        if (hasCompleted) return 2;
        return 3;
      };

      return getCategoryWeight(aCourses) - getCategoryWeight(bCourses);
    });
    // eslint-disable-next-line
  }, [categories, sortedCourses]);

  return {
    categories: filtredCategories,
    courses: [...filtredCourses, ...otherCourses],
  };
};

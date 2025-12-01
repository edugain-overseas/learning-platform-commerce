import React from "react";
import CircleProgressCard from "../CircleProgressCard/CircleProgressCard";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import { calcAvarage } from "../../utils/calcAvarage";

const circleProgressCardStaticProps = {
  title: {
    progress: "Progress Average",
    grade: "Grade Point Average",
  },
  strokeColor: {
    progress: "#39BA6D",
    grade: "#FCC400",
  },
  outerColor: {
    progress: "#fdfdfd",
    grade: "#fdfdfd",
  },
  strokeBackgroundColor: {
    progress: "#ececec",
    grade: "#ececec",
  },
  progress: {
    progress: (value) => value,
    grade: (value) => Math.round((value / 200) * 100),
  },
};

const UserProfileStatCard = ({ type, renderTitle = () => null }) => {
  const userCourses = useSelector(getAllCourses).filter(
    (course) => course.bought
  );

  const calcValue = {
    progress: () => {
      // avarage progress of courses which user bought
      return calcAvarage(userCourses.map((course) => course.progress));
    },
    grade: () => {
      // avarage grade of courses which user bought
      return calcAvarage(userCourses.map((course) => course.grade));
    },
  };  

  const circleProgressCardProps = {
    ...circleProgressCardStaticProps,
    value: calcValue[type]?.(),
  };

  return (
    <CircleProgressCard
      cardTitle={circleProgressCardProps.title[type]}
      strokeColor={circleProgressCardProps.strokeColor[type]}
      outerColor={circleProgressCardProps.outerColor[type]}
      strokeBackgroundColor={
        circleProgressCardProps.strokeBackgroundColor[type]
      }
      progress={circleProgressCardProps.progress[type]?.(
        circleProgressCardProps.value
      )}
      progressTitle={renderTitle(circleProgressCardProps.value)}
    />
  );
};

export default UserProfileStatCard;

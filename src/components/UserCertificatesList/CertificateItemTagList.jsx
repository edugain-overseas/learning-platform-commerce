import React from "react";
import { useSelector } from "react-redux";
import { Tag } from "antd";
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { getAllCourses } from "../../redux/course/selectors";
// import { getAllCategories } from "../../redux/category/selectors";
import { ReactComponent as BasketIcon } from "../../images/icons/cart.svg";
import styles from "./UserCertificatesList.module.scss";
import { useCart } from "../../context/cartContext";

const tagColors = {
  type: "geekblue",
  certificate: "success",
  noCertificate: "default",
  purchased: "orange",
  purchasedAll: "green",
};

const CertificateItemTagList = ({ certificate, type }) => {
  const id = certificate[`${type}_id`];
  const certificateLink = certificate[`${type}_certificate_link`];

  const { addItem, handleOpen } = useCart();

  const courses = useSelector(getAllCourses);
//   const category =
//     useSelector(getAllCategories).find(
//       (category) => category.id === id && type === "category"
//     ) || null;

  const coursesOfCategory =
    type === "category"
      ? courses.filter((course) => course.category_id === id)
      : null;

  const purchasedCoursesOfCategory =
    coursesOfCategory?.filter(({ bought }) => bought) || null;

  const isAllCoursesPurchased =
    coursesOfCategory?.length === purchasedCoursesOfCategory?.length;


  const purchaseAllTheRest = () => {
    coursesOfCategory
      .filter(({ bought }) => !bought)
      .forEach((course) => {
        addItem(course.id);
      });
    handleOpen();
  };

  const tags = {
    common: [
      { value: type, color: tagColors.type, icon: null },
      {
        value: certificateLink ? "certificate" : "no certificate",
        color:
          tagColors[`${certificateLink ? "certificate" : "noCertificate"}`],
        icon: certificateLink ? (
          <CheckCircleOutlined />
        ) : (
          <MinusCircleOutlined />
        ),
      },
    ],
    category: [
      {
        value: `purchased ${purchasedCoursesOfCategory?.length}/${coursesOfCategory?.length} courses`,
        color:
          tagColors[`${isAllCoursesPurchased ? "purchasedAll" : "purchased"}`],
        hoverChild: isAllCoursesPurchased
          ? null
          : {
              value: (
                <button onClick={purchaseAllTheRest} className={styles.buyBtn}>
                  <span>Buy all the rest</span>
                  <BasketIcon />
                </button>
              ),
              color: "#d00000",
              icon: null,
            },
      },
    ],
    course: [],
  };

  return (
    <div className={styles.tagsWrapper}>
      {tags.common.map(({ value, color, icon }, index) => (
        <Tag key={index} color={color} icon={icon}>
          {value}
        </Tag>
      ))}
      {tags[type].map(({ value, color, icon, hoverChild }, index) => {
        if (!hoverChild) {
          return (
            <Tag key={index} color={color} icon={icon}>
              {value}
            </Tag>
          );
        }

        return (
          <div className={styles.hoverTagContainer}>
            <Tag
              key={index}
              color={color}
              icon={icon}
              className={styles.hoverParent}
            >
              {value}
            </Tag>
            <Tag
              key={`${index}-hover`}
              color={hoverChild.color}
              icon={hoverChild.icon}
              className={styles.hoverChild}
            >
              {hoverChild.value}
            </Tag>
          </div>
        );
      })}
    </div>
  );
};

export default CertificateItemTagList;

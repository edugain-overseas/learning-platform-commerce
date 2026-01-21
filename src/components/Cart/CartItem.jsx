import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/course/selectors";
import { useCart } from "../../context/cartContext";
import { ReactComponent as TrashIcon } from "../../images/icons/trash-cart.svg";
import CartCourseCard from "./CartCourseCard";
import styles from "./Cart.module.scss";

const ProposedItems = ({ proposedCourses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const accordionRef = useRef(null);

  const toggleOpen = () => {
    accordionRef.current.style.setProperty(
      "max-height",
      `${isOpen ? 0 : accordionRef.current.scrollHeight}px`
    );
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.proposedItemsAccordionWrapper}>
      <ul className={styles.proposedItems} ref={accordionRef}>
        {proposedCourses.map((course) => (
          <li key={course.id}>
            <CartCourseCard course={course} isProposed={true} />
          </li>
        ))}
      </ul>
      <button className={styles.toggleOpenBtn} onClick={toggleOpen}>
        <span>
          {isOpen ? "Hide all available courses" : "See all available courses"}
        </span>
      </button>
    </div>
  );
};

const CartItem = ({ item }) => {
  const courses = useSelector(getAllCourses);
  const courseInfo = courses?.find((course) => course.id === item.id);

  const { removeItem, getCoursesToPropose } = useCart();
  const proposedCourses = getCoursesToPropose(item.id);

  return (
    <li className={styles.cartItem}>
      <div className={styles.itemWrapper}>
        <div className={styles.cardWrapper}>
          <CartCourseCard course={courseInfo} checked={item.checked} />
        </div>
        <button
          className={styles.removeBtn}
          onClick={() => removeItem(item.id)}
        >
          <TrashIcon />
        </button>
      </div>
      {proposedCourses.length !== 0 && (
        <ProposedItems proposedCourses={proposedCourses} />
      )}
    </li>
  );
};

export default CartItem;

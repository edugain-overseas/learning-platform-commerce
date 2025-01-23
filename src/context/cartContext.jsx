import { createContext, useContext, useState } from "react";
import { getAllCourses } from "../redux/course/selectors";
import { useSelector } from "react-redux";
import Drawer from "../components/shared/Drawer/Drawer";
import Cart from "../components/Cart/Cart";
import useLocalStorage from "../hooks/useLocalStorage";
import { getUserCourses } from "../redux/user/selectors";
import { getAllCategories } from "../redux/category/selectors";
import useMessage from "antd/es/message/useMessage";

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const userCourses = useSelector(getUserCourses);
  const courses = useSelector(getAllCourses);
  const categories = useSelector(getAllCategories);
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
  const [isOpen, setIsOpen] = useState(false);
  const [messageApi, contextHolder] = useMessage();

  const addItem = (courseId) => {
    setCartItems((currentItems) => [
      ...currentItems,
      { id: courseId, checked: true },
    ]);
  };

  const removeItem = (courseId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== courseId)
    );
  };

  const toggleChecked = (courseId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === courseId) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const addAllCoursesInCategory = (categoryId) => {
    const coursesToAdd = courses.filter(
      (course) =>
        course.category_id === categoryId &&
        !cartItems.find((item) => item.id === course.id) &&
        !userCourses.find((userCourse) => userCourse.course_id === course.id)
    );

    console.log(coursesToAdd);

    if (coursesToAdd.length === 0) {
      messageApi.info({
        content: "All courses is already in basket",
        duration: 3,
      });
    } else {
      setCartItems((prev) => [
        ...prev,
        ...coursesToAdd.map((course) => ({ id: course.id, checked: true })),
      ]);
    }
  };

  const getCoursesToPropose = (courseItemId) => {
    const courseCategoryId = courses.find(
      (course) => course.id === courseItemId
    )?.category_id;

    const categoryCourses = courses.filter(
      (course) => course.category_id === courseCategoryId
    );

    const coursesToPropose = categoryCourses.filter(
      (course) =>
        !cartItems.find(({ id }) => id === course.id) &&
        !userCourses.find(({ course_id }) => course_id === course.id)
    );

    return coursesToPropose;
  };

  const getSubtotal = () =>
    cartItems.reduce((sum, item) => {
      if (item.checked) {
        const itemPrice = courses.find(
          (course) => course.id === item.id
        )?.price;
        return sum + itemPrice;
      }
      return sum;
    }, 0);

  const getDiscount = () =>
    cartItems.reduce((sum, item) => {
      if (item.checked) {
        const itemPrice = courses.find(
          (course) => course.id === item.id
        )?.price;
        const categoryId = courses.find(
          (course) => course.id === item.id
        )?.category_id;

        if (!categoryId) return sum;

        const categoryCourses = courses.filter(
          (course) => course.category_id === categoryId
        );
        const notPurchasedCategoryCourses = categoryCourses.filter(
          (course) =>
            !userCourses.find(
              (userCourse) => userCourse.course_id === course.id
            )
        );

        const isAllNotPurchasedCategoryCoursesInCart =
          notPurchasedCategoryCourses.every((course) =>
            cartItems.find((item) => item.id === course.id && item.checked)
          );

        if (isAllNotPurchasedCategoryCoursesInCart) {
          const categoryDiscount = categories.find(
            (category) => category.id === categoryId
          )?.discount;
          if (!categoryDiscount) {
            return sum;
          }
          return sum + (itemPrice * categoryDiscount) / 100;
        }
      }
      return sum;
    }, 0);

  const totalPrice = getSubtotal() - getDiscount();

  const cartQuantity = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        totalPrice,
        addItem,
        removeItem,
        handleOpen,
        handleClose,
        getCoursesToPropose,
        toggleChecked,
        getSubtotal,
        getDiscount,
        addAllCoursesInCategory,
      }}
    >
      {contextHolder}
      {children}
      {isOpen && (
        <Drawer
          orientation="right"
          size="500rem"
          handleClose={handleClose}
          headerTitle="Basket"
        >
          <Cart items={cartItems} handleClose={handleClose} />
        </Drawer>
      )}
    </CartContext.Provider>
  );
};

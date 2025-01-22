import { createContext, useContext, useState } from "react";
import { getAllCourses } from "../redux/course/selectors";
import { useSelector } from "react-redux";
import Drawer from "../components/shared/Drawer/Drawer";
import Cart from "../components/Cart/Cart";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  getAccessToken,
  getUserCourses,
  getUserInfo,
} from "../redux/user/selectors";
import { getAllCategories } from "../redux/category/selectors";
// import { courses } from "../assets/courses";

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const accessToken = useSelector(getAccessToken);
  const studentId = useSelector(getUserInfo)?.studentId;
  const userCourses = useSelector(getUserCourses);
  const courses = useSelector(getAllCourses);
  const categories = useSelector(getAllCategories);
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
  const [paymentLink, setPaymentLink] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  console.log(accessToken, studentId, setPaymentLink);

  const totalPrice = courses
    .filter(({ id }) => cartItems.includes(id))
    .reduce((total, { price: coursePrice }) => total + coursePrice, 0);

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

  const getCoursesToPropose = (courseItemId) => {
    const courseCategoryId = courses.find(
      (course) => course.id === courseItemId
    ).category_id;

    const categoryCourses = courses.filter(
      (course) => course.category_id === courseCategoryId
    );

    const coursesToPropose = categoryCourses.filter(
      (course) =>
        !cartItems.find(({ id }) => id === course.id) &&
        !userCourses.find(({ id }) => id === course.id)
    );

    return coursesToPropose;
  };

  const getSubtotal = () =>
    cartItems.reduce((sum, item) => {
      if (item.checked) {
        const itemPrice = courses.find((course) => course.id === item.id).price;
        return sum + itemPrice;
      }
      return sum;
    }, 0);

  const getDiscount = () =>
    cartItems.reduce((sum, item) => {
      if (item.checked) {
        const itemPrice = courses.find((course) => course.id === item.id).price;
        const categoryId = courses.find(
          (course) => course.id === item.id
        ).category_id;
        const categoryCourses = courses.filter(
          (course) => course.category_id === categoryId
        );
        const notPurchasedCategoryCourses = categoryCourses.filter(
          (course) =>
            !userCourses.find((userCourse) => userCourse.id === course.id)
        );
        const isAllNotPurchasedCategoryCoursesInCart =
          notPurchasedCategoryCourses.every((course) =>
            cartItems.find((item) => item.id === course.id && item.checked)
          );

        if (isAllNotPurchasedCategoryCoursesInCart) {
          const categoryDiscount = categories.find(
            (category) => category.id === categoryId
          ).discount;
          return sum + (itemPrice * categoryDiscount) / 100;
        }
      }
      return sum;
    }, 0);

  const cartQuantity = cartItems.length;

  // useEffect(() => {
  //   const updatePaymentLink = async () => {
  //     if (accessToken && studentId) {
  //       if (cartQuantity) {
  //         setIsLoading(true);
  //         try {
  //           const { link: newPaymentLink } = await updateCart(
  //             studentId,
  //             cartItems
  //           );
  //           console.log(newPaymentLink);
  //           setPaymentLink(newPaymentLink);
  //         } catch (error) {
  //           console.log(error);
  //           setPaymentLink(null);
  //         } finally {
  //           setIsLoading(false);
  //         }
  //       }
  //     }
  //   };

  //   if (cartItems.length !== 0) {
  //     updatePaymentLink();
  //   } else {
  //     setPaymentLink(null);
  //   }

  //   // eslint-disable-next-line
  // }, [cartItems, studentId]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        totalPrice,
        paymentLink,
        addItem,
        removeItem,
        handleOpen,
        handleClose,
        getCoursesToPropose,
        toggleChecked,
        getSubtotal,
        getDiscount,
      }}
    >
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

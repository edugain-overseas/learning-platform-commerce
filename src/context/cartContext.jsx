import { createContext, useContext, useEffect, useState } from "react";
import { getAllCourses } from "../redux/course/selectors";
import { useSelector } from "react-redux";
import Drawer from "../components/shared/Drawer/Drawer";
import Cart from "../components/Cart/Cart";
import useLocalStorage from "../hooks/useLocalStorage";
import { getAccessToken, getUserInfo } from "../redux/user/selectors";
import { updateCart } from "../http/services/user";
// import { courses } from "../assets/courses";

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const accessToken = useSelector(getAccessToken);
  const studentId = useSelector(getUserInfo)?.studentId;
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
  const [paymentLink, setPaymentLink] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const courses = useSelector(getAllCourses);

  const totalPrice = courses
    .filter(({ id }) => cartItems.includes(id))
    .reduce((total, { price: coursePrice }) => total + coursePrice, 0);

  const addItem = (id) => {
    setCartItems((currentItems) => [...currentItems, id]);
  };
  const removeItem = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item !== id));
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const cartQuantity = cartItems.length;

  useEffect(() => {
    const updatePaymentLink = async () => {
      if (accessToken && studentId) {
        if (cartQuantity) {
          setIsLoading(true);
          try {
            const { link: newPaymentLink } = await updateCart(
              studentId,
              cartItems
            );
            console.log(newPaymentLink);
            setPaymentLink(newPaymentLink);
          } catch (error) {
            console.log(error);
            setPaymentLink(null);
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    if (cartItems.length !== 0) {
      updatePaymentLink();
    } else {
      setPaymentLink(null);
    }

    // eslint-disable-next-line
  }, [cartItems, studentId]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        totalPrice,
        isLoading,
        paymentLink,
        addItem,
        removeItem,
        handleOpen,
        handleClose,
      }}
    >
      {children}
      {isOpen && (
        <Drawer orientation="right" size="500rem" handleClose={handleClose}>
          <Cart items={cartItems} handleClose={handleClose} />
        </Drawer>
      )}
    </CartContext.Provider>
  );
};

import { createContext, useContext, useState } from "react";
import { getAllCourses } from "../redux/course/selectors";
import { useSelector } from "react-redux";
import Drawer from "../components/shared/Drawer/Drawer";
import Cart from "../components/Cart/Cart";
import useLocalStorage from "../hooks/useLocalStorage";
// import { courses } from "../assets/courses";

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
  const [isOpen, setIsOpen] = useState(false);

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
  console.log(cartQuantity);
  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        handleOpen,
        handleClose,
        cartItems,
        cartQuantity,
        totalPrice,
      }}
    >
      {children}
      {isOpen && (
        <Drawer orientation="right" size="500rem" handleClose={handleClose}>
          <Cart
            items={cartItems}
            handleClose={handleClose}
          />
        </Drawer>
      )}
    </CartContext.Provider>
  );
};

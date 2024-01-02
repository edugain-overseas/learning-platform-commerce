import { createContext, useContext, useState } from "react";
import Drawer from "../components/shared/Drawer/Drawer";
import Cart from "../components/Cart/Cart";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);
  const [isOpen, setIsOpen] = useState(false);

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
  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        handleOpen,
        handleClose,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      {isOpen && (
        <Drawer orientation="right" size="500rem">
          <Cart items={cartItems} />
        </Drawer>
      )}
    </CartContext.Provider>
  );
};

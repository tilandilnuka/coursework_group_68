"use client";

import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const readStoredCartItems = () => {
  try {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) || {} : {};
  } catch (error) {
    console.error("Error parsing stored cart items:", error);
    return {};
  }
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  let socket;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCartItems(readStoredCartItems());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const updateCartItems = (newCartItems) => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemid in cartItems) {
      if (cartItems.hasOwnProperty(itemid)) {
        const item = cartItems[itemid];
        totalAmount += item.itemprice * item.count;
      }
    }

    return totalAmount;
  };

  const addToCart = (itemid, itemprice, itemtitle, itemimages) => {
    if (cartItems.hasOwnProperty(itemid)) {
      let tempCart = {
        ...cartItems,
        [itemid]: {
          ...cartItems[itemid],
          count: cartItems[itemid].count + 1,
        },
      };

      setCartItems(tempCart);
      updateCartItems(tempCart);
    } else {
      let tempCart = {
        ...cartItems,
        [itemid]: {
          itemId: itemid,
          itemid,
          itemprice,
          itemtitle,
          itemimages,
          count: 1,
        },
      };

      setCartItems(tempCart);
      updateCartItems(tempCart);
    }
  };

  const removeFromCart = (itemid) => {
    if (Object.keys(cartItems).length === 0) {
      return;
    } else {
      if (cartItems.hasOwnProperty(itemid)) {
        if (cartItems[itemid].count > 1) {
          let tempCart = {
            ...cartItems,
            [itemid]: {
              ...cartItems[itemid],
              count: cartItems[itemid].count - 1,
            },
          };

          setCartItems(tempCart);
          updateCartItems(tempCart);
        } else {
          const updatedCart = { ...cartItems };
          delete updatedCart[itemid];
          setCartItems(updatedCart);
          updateCartItems(updatedCart);
        }
      }
    }
  };

  const updateCartItemCount = (
    itemId,
    newAmount,
    itemprice,
    itemtitle,
    itemimages,
  ) => {
    console.log(
      itemId,
      newAmount,
      itemprice,
      itemtitle,
      itemimages,
      "this is from update cart item count...",
    );
    if (newAmount <= 0) {
      const updatedCart = { ...cartItems };
      delete updatedCart[itemId];
      setCartItems(updatedCart);
      updateCartItems(updatedCart);
    } else {
      if (cartItems.hasOwnProperty(itemId)) {
        let tempCart = {
          ...cartItems,
          [itemId]: {
            ...cartItems[itemId],
            count: newAmount,
          },
        };

        setCartItems(tempCart);
        updateCartItems(tempCart);
      } else {
        let tempCart = {
          ...cartItems,
          [itemId]: {
            itemId,
            itemid: itemId,
            itemprice,
            itemtitle,
            itemimages,
            count: newAmount,
          },
        };

        setCartItems(tempCart);
        updateCartItems(tempCart);
      }
    }
  };

  const removeEntireItem = (itemId) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[itemId];
    setCartItems(updatedCart);
    updateCartItems(updatedCart);
  };

  const getItemCountById = (itemId) => {
    if (typeof window === "undefined") {
      return 0;
    }

    const storedCartItems = readStoredCartItems();

    if (storedCartItems && storedCartItems[itemId]) {
      return storedCartItems[itemId].count;
    }

    return 0;
  };

  const checkout = () => {
    setCartItems({});
    if (typeof window !== "undefined") {
      localStorage.removeItem("cartItems");
    }
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    removeEntireItem,
    getTotalCartAmount,
    checkout,
    socket,
    getItemCountById,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

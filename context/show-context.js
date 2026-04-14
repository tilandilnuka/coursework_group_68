"use client";

import { createContext, useState } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === "undefined") {
      return {};
    }

    return JSON.parse(localStorage.getItem("cartItems")) || {};
  });
  let socket;

  const updateCartItems = (newCartItems) => {
    console.log(newCartItems, "----------------------- New Cart Items");
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    console.log(
      JSON.parse(localStorage.getItem("cartItems")),
      "----------------------- New Cart Items",
    );
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

    const cartItemsString = localStorage.getItem("cartItems");

    if (cartItemsString) {
      try {
        const cartItems = JSON.parse(cartItemsString);

        if (cartItems && cartItems[itemId]) {
          return cartItems[itemId].count;
        }
      } catch (error) {
        console.error("Error parsing cartItems JSON:", error);
      }
    }

    return 0;
  };

  const checkout = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
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

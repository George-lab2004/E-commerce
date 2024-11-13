// CartContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TokenContext } from "./TokenContext"; // Import TokenContext to access token

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const { token } = useContext(TokenContext); // Get token from TokenContext
  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState(0);
  const [cartId, setCartId] = useState(null);

  // Set up headers using the token
  const headers = { token: token || "" };

  // Re-fetch cart data if token changes (after login)
  useEffect(() => {
    if (token) {
      getCartProducts();
    }
  }, [token]);

  // Add product to cart
  async function addProductToCart(productId) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );
      setNumber(response.data.numOfCartItems);
      setCartId(response.data.data._id);
      toast.success(response.data.message);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding product");
      return error;
    }
  }

  // Get cart products
  async function getCartProducts() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      setNumber(response.data.numOfCartItems);
      setPrice(response.data.data.totalCartPrice);
      setCartId(response.data.data._id);
      return response;
    } catch (error) {
      console.error("Error fetching cart products:", error);
      return error;
    }
  }

  // Delete a product from cart
  async function deleteProduct(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      setNumber(response.data.numOfCartItems);
      setPrice(response.data.data.totalCartPrice);
      return response;
    } catch (error) {
      console.error("Error deleting product:", error);
      return error;
    }
  }

  // Update cart item count
  async function updateCartItem(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );
      setPrice(response.data.data.totalCartPrice);
      setCartId(response.data.data._id);
      return response;
    } catch (error) {
      console.error("Error updating cart item:", error);
      return error;
    }
  }

  // Clear the cart
  async function clearCart() {
    try {
      const response = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers }
      );
      setNumber(response.data.numOfCartItems);
      setPrice(response.data.data.totalCartPrice);
      return response;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return error;
    }
  }

  // Online payment checkout
  async function onlinePayment(shippingAddress) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`,
        { shippingAddress },
        { headers }
      );
      window.location.href = response.data.session.url;
      return response;
    } catch (error) {
      console.error("Error processing online payment:", error);
      return error;
    }
  }

  // Cash payment checkout
  async function cashPayment(shippingAddress) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        { headers }
      );
      window.location.href = "http://localhost:5173/allorders";
      return response;
    } catch (error) {
      console.error("Error processing cash payment:", error);
      return error;
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        number,
        deleteProduct,
        getCartProducts,
        clearCart,
        price,
        updateCartItem,
        onlinePayment,
        cashPayment,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

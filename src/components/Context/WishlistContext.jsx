import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TokenContext } from "./TokenContext";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  // Renamed to WishlistContextProvider
  const { token } = useContext(TokenContext); // Get token from TokenContext

  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState(0);

  const headers = { token: token || "" };

  // Re-fetch cart data if token changes (after login)
  useEffect(() => {
    if (token) {
      getWishListProducts();
    }
  }, [token]);

  async function addProductToWishList(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
        return response;
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "An error occurred");
        return error;
      });
  }
  async function getWishListProducts() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((response) => {
        console.log(response);
        // setnumber(response.data.numOfCartItems)
        // setPrice(response.data.data.totalCartPrice)

        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  async function deleteProduct(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => {
        console.log(response);

        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  return (
    <WishlistContext.Provider
      value={{ addProductToWishList, getWishListProducts, deleteProduct }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}

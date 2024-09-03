
import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from "./ProductSlice";
 
export let store = configureStore({
    reducer :{
//reducer name
ProductRed: ProductReducer
    }
})
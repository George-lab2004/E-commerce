import { createSlice } from "@reduxjs/toolkit";
let initialState={
    counter:20
}
let productSlice = createSlice({
    name:"Product",
    initialState,
    reducers:{
        increament:(state)=>{
            state.counter++
        },
        decreament:(state)=>{
            state.counter--;
        }
    }
})
export  let {increament, decreament} = productSlice.actions;
export let ProductReducer = productSlice.reducer;
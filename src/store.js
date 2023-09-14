import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: "홍길동",
    reducers : {
        changeName(state){
            return "테스트" + state
        }
    }
})

let dark = createSlice({
    name : "dark",
    initialState : "light",
    reducers : {
        // toggleTheme2(state){
        //     return(state === "light" ? "dark" : "light")
        // }

        toggleTheme : (state) => state === "light" ? "dark" : "light"
    }
})

export const {changeName} = user.actions;
export const {toggleTheme} = dark.actions;

export default configureStore({
    reducer : {
        user : user.reducer,
        dark : dark.reducer
    }
})


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },

        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setTheme, login, logout } = authSlice.actions;
export default authSlice.reducer;

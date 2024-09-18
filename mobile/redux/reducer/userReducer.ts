import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import { UserReducerInitialState } from "@/types/reducer";

const initialState: UserReducerInitialState = {
    user: null,
    loading: true,
};

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExist: (state, action: PayloadAction<User>) => {
            state.loading = true;
            state.user = action.payload;
            state.loading = false;
        },
        userNotExist: (state) => {
            state.loading = false;
            state.user = null;
        },
    },
});

export const { userExist, userNotExist } = userReducer.actions;

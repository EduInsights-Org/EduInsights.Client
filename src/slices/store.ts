import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@slices/authSlice";
import instituteReducer from "@slices/instituteSlice";
import batchReducer from "@slices/batchSlice";
import userReducer from "@slices/userSlice";
import subjectReducer from "@slices/subjectSlice";
import semesterReducer from "@slices/semesterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    institute: instituteReducer,
    batch: batchReducer,
    subject: subjectReducer,
    semester: semesterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

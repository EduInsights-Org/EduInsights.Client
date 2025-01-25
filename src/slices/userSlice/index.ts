import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "../../config/config";
import { AxiosPrivateService } from "../../utils/apiService";
import { RequestState } from "../../utils/types";

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  userName: string;
  indexNumber?: string | null;
  email: string;
  instituteId: string;
  batchId: string | null;
  password: string;
  role: string;
}

export interface AddUsersResponse {
  success: boolean;
  addedUsers: string[];
  invalidUsers: string[];
  existingUsers: string[];
  message: string;
}

interface User {
  name: string;
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  indexNumber: string | null;
  role: string;
}
interface UserState {
  status: RequestState;
  user: User | null;
  users: User[] | [];
  message: AddUsersResponse | null;
  error: string | null;
}

const initialState: UserState = {
  status: RequestState.IDLE,
  error: null,
  user: null,
  users: [],
  message: null,
};

const instituteSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMultipleUsers.pending, (state) => {
        state.status = RequestState.LOADING;
      })
      .addCase(
        addMultipleUsers.fulfilled,
        (state, action: PayloadAction<{ data: AddUsersResponse }>) => {
          state.message = action.payload.data;
          state.status = RequestState.SUCCEEDED;
        }
      )
      .addCase(addMultipleUsers.rejected, (state) => {
        state.status = RequestState.FAILED;
      })
      .addCase(addUser.pending, (state) => {
        state.status = RequestState.LOADING;
      })
      .addCase(
        addUser.fulfilled,
        (state, action: PayloadAction<{ data: AddUsersResponse }>) => {
          state.message = action.payload.data;
          state.status = RequestState.SUCCEEDED;
        }
      )
      .addCase(addUser.rejected, (state) => {
        state.status = RequestState.FAILED;
      })
      .addCase(getUsers.pending, (state) => {
        state.status = RequestState.LOADING;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<{ data: User[] }>) => {
          state.users = action.payload.data;
          state.status = RequestState.SUCCEEDED;
        }
      )
      .addCase(getUsers.rejected, (state) => {
        state.status = RequestState.FAILED;
      });
  },
});

export const addMultipleUsers = createAsyncThunk(
  "user/addMultipleUsers",
  async (users: CreateUserPayload[]) => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .post(AppConfig.serviceUrls.user + "multi-add", users)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (user: CreateUserPayload) => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .post(AppConfig.serviceUrls.user, user)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  return new Promise<any>((resolve, reject) => {
    AxiosPrivateService.getInstance()
      .get(AppConfig.serviceUrls.user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

export const {} = instituteSlice.actions;
export default instituteSlice.reducer;

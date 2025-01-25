import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "../../config/config";
import {
  AxiosPrivateService,
  AxiosPublicService,
} from "../../utils/apiService";
import { RequestState } from "../../utils/types";

interface BasicInfo {
  firstName: string;
  lastName: string;
  userName: string;
}
interface AuthState {
  loginStatus: RequestState;
  registerStatus: RequestState;
  logoutStatus: RequestState;
  status: RequestState;
  isAuthenticated: boolean;
  userInfo: BasicInfo | null;
  userRole: string | null;
  accessToken: string | null;
  error: string | null;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  userName: string;
  instituteName: string;
  password: string;
  role: string;
}

interface LoginPayload {
  userName: string;
  password: string;
}

const initialState: AuthState = {
  loginStatus: RequestState.IDLE,
  registerStatus: RequestState.IDLE,
  logoutStatus: RequestState.IDLE,
  isAuthenticated: false,
  userInfo: null,
  status: RequestState.IDLE,
  userRole: null,
  accessToken: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerStatus = RequestState.LOADING;
      })
      .addCase(register.fulfilled, (state) => {
        state.registerStatus = RequestState.SUCCEEDED;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
        state.registerStatus = RequestState.FAILED;
      })

      .addCase(login.pending, (state) => {
        state.loginStatus = RequestState.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userInfo = action.payload.data.userInfo;
        state.accessToken = action.payload.data.accessToken;
        state.loginStatus = RequestState.SUCCEEDED;
        state.status = RequestState.SUCCEEDED;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loginStatus = RequestState.FAILED;
      })

      .addCase(logout.pending, (state) => {
        state.logoutStatus = RequestState.LOADING;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userRole = null;
        state.accessToken = null;
        state.logoutStatus = RequestState.SUCCEEDED;
      })
      .addCase(logout.rejected, (state) => {
        state.logoutStatus = RequestState.FAILED;
      })

      .addCase(refreshAccessToken.pending, (state) => {
        state.status = RequestState.LOADING;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        console.log(action.payload.data);
        state.accessToken = action.payload.data.accessToken;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.status = RequestState.FAILED;
      })

      .addCase(getUserInfo.pending, (state) => {
        state.status = RequestState.LOADING;
      })
      .addCase(
        getUserInfo.fulfilled,
        (state, action: PayloadAction<{ data: BasicInfo }>) => {
          state.userInfo = action.payload.data;
          state.status = RequestState.SUCCEEDED;
        }
      )
      .addCase(getUserInfo.rejected, (state) => {
        state.status = RequestState.FAILED;
      });
  },
});

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      firstName,
      lastName,
      userName,
      password,
      instituteName,
      role,
    }: RegisterPayload,
    { rejectWithValue }
  ) => {
    return AxiosPublicService.getInstance()
      .post(
        AppConfig.serviceUrls.register,
        JSON.stringify({
          firstName,
          lastName,
          userName,
          password,
          instituteName,
          role,
        })
      )
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(
          error.response?.data?.message || error.message || "An error occurred"
        );
      });
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ userName, password }: LoginPayload, { rejectWithValue }) => {
    return AxiosPublicService.getInstance()
      .post(AppConfig.serviceUrls.login, JSON.stringify({ userName, password }))
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(
          error.response?.data?.message || error.message || "An error occurred"
        );
      });
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    return AxiosPublicService.getInstance()
      .get(AppConfig.serviceUrls.logout)
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(
          error.response?.data?.message || error.message || "An error occurred"
        );
      });
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    return AxiosPublicService.getInstance()
      .get(AppConfig.serviceUrls.refreshToken)
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(
          error.response?.data?.message || error.message || "An error occurred"
        );
      });
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (userId: string) => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .get(AppConfig.serviceUrls.user + userId)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;

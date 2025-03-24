import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "@config/config";
import { AxiosPrivateService, AxiosPublicService } from "@utils/apiService";
import { ErrorCode, RequestState } from "@utils/enums";

interface BasicInfo {
  firstName: string;
  lastName: string;
  email: string;
}
export interface AuthState {
  loginStatus: RequestState;
  registerStatus: RequestState;
  emailVerifyingStatus: RequestState;
  sendVerificationCodeStatus: RequestState;
  logoutStatus: RequestState;
  status: RequestState;
  isAuthenticated: boolean;
  userInfo: BasicInfo | null;
  userRole: string | null;
  accessToken: string | null;
  isVerificationSent: boolean;
  isVerified: boolean;
  errorCode: ErrorCode | null;
  error: string | null;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  instituteName: string;
  password: string;
  role: string;
}

interface LoginPayload {
  email: string;
  password: string;
}
interface VerifyEmailPayload {
  email: string;
  code: string;
}

interface ErrorResponse {
  message: string;
  statusCode: number;
  errorCode: ErrorCode;
}

const initialState: AuthState = {
  loginStatus: RequestState.IDLE,
  registerStatus: RequestState.IDLE,
  logoutStatus: RequestState.IDLE,
  emailVerifyingStatus: RequestState.IDLE,
  sendVerificationCodeStatus: RequestState.IDLE,
  isAuthenticated: false,
  userInfo: null,
  status: RequestState.IDLE,
  userRole: null,
  accessToken: null,
  isVerificationSent: false,
  isVerified: false,
  errorCode: null,
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
    setVerificationSent: (state, action: PayloadAction<boolean>) => {
      state.isVerificationSent = action.payload;
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
    resetErrorMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerStatus = RequestState.LOADING;
      })
      .addCase(register.fulfilled, (state) => {
        state.isVerificationSent = true;
        state.registerStatus = RequestState.SUCCEEDED;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
        state.registerStatus = RequestState.FAILED;
      })

      .addCase(verifyEmail.pending, (state) => {
        state.emailVerifyingStatus = RequestState.LOADING;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isVerified = true;
        state.emailVerifyingStatus = RequestState.SUCCEEDED;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.error = action.payload as string;
        state.emailVerifyingStatus = RequestState.FAILED;
      })

      .addCase(sendVerificationCode.pending, (state) => {
        state.sendVerificationCodeStatus = RequestState.LOADING;
      })
      .addCase(sendVerificationCode.fulfilled, (state) => {
        state.isVerificationSent = true;
        state.sendVerificationCodeStatus = RequestState.SUCCEEDED;
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        state.error = action.payload as string;
        state.sendVerificationCodeStatus = RequestState.FAILED;
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
        const errorResponse = action.payload as ErrorResponse;
        state.error = errorResponse.message;
        state.errorCode = errorResponse.errorCode;
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
      email,
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
          email,
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
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    return AxiosPublicService.getInstance()
      .post(AppConfig.serviceUrls.login, JSON.stringify({ email, password }))
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

export const sendVerificationCode = createAsyncThunk(
  "auth/sendVerificationCode",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    const params = new URLSearchParams();
    params.append("email", email);
    return AxiosPublicService.getInstance()
      .post(`${AppConfig.serviceUrls.email}send-verification-code?${params}`)
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(
          error.response?.data?.message || error.message || "An error occurred"
        );
      });
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email, code }: VerifyEmailPayload, { rejectWithValue }) => {
    return AxiosPublicService.getInstance()
      .post(
        AppConfig.serviceUrls.email + "verify-email",
        JSON.stringify({ email, code })
      )
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

export const {
  resetAuth,
  setVerificationSent,
  setVerified,
  resetErrorMessage,
} = authSlice.actions;
export default authSlice.reducer;

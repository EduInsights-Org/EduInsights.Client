import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "@config/config";
import { AxiosPrivateService } from "@utils/apiService";
import { RequestState, Role } from "@utils/types";

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
  role: Role;
}

interface PaginatedResponse {
  data: User[];
  totalRecords: number;
  currentPage: number;
  pageSize: number;
}

interface GetRoleDistributionResponse {
  superAdmin: number;
  admin: number;
  dataEntry: number;
  student: number;
}

export interface UserState {
  status: RequestState;
  user: User | null;
  message: AddUsersResponse | null;
  error: string | null;
  paginatedResponse: PaginatedResponse;
  roleDistribution: GetRoleDistributionResponse;
}

const initialState: UserState = {
  status: RequestState.IDLE,
  error: null,
  user: null,
  message: null,
  paginatedResponse: {
    currentPage: 0,
    data: [],
    pageSize: 10,
    totalRecords: 0,
  },
  roleDistribution: {
    superAdmin: 0,
    admin: 0,
    dataEntry: 0,
    student: 0,
  },
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
        (state, action: PayloadAction<{ data: PaginatedResponse }>) => {
          state.paginatedResponse = action.payload.data;
          state.status = RequestState.SUCCEEDED;
        }
      )
      .addCase(getUsers.rejected, (state) => {
        state.status = RequestState.FAILED;
      })
      .addCase(getRoleDistribution.pending, (state) => {
        state.status = RequestState.LOADING;
      })
      .addCase(
        getRoleDistribution.fulfilled,
        (
          state,
          action: PayloadAction<{ data: GetRoleDistributionResponse }>
        ) => {
          state.roleDistribution = action.payload.data;
          state.status = RequestState.SUCCEEDED;
        }
      )
      .addCase(getRoleDistribution.rejected, (state) => {
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
  async (user: CreateUserPayload, { rejectWithValue }) => {
    try {
      const response = await AxiosPrivateService.getInstance().post(
        AppConfig.serviceUrls.user,
        user
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add user");
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async ({
    instituteId,
    batchId,
    page,
    pageSize,
  }: {
    instituteId?: string;
    batchId?: string | null;
    page: number;
    pageSize: number;
  }) => {
    return new Promise<any>((resolve, reject) => {
      const params = new URLSearchParams();
      if (instituteId) params.append("instituteId", instituteId);
      if (batchId) params.append("batchId", batchId);
      params.append("page", page.toString());
      params.append("pageSize", pageSize.toString());

      AxiosPrivateService.getInstance()
        .get(`${AppConfig.serviceUrls.user}?${params.toString()}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const getRoleDistribution = createAsyncThunk(
  "user/getRoleDistribution",
  async ({ instituteId }: { instituteId: string }) => {
    return new Promise<any>((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("instituteId", instituteId);

      AxiosPrivateService.getInstance()
        .get(
          `${AppConfig.serviceUrls.user}role-distribution?${params.toString()}`
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const {} = instituteSlice.actions;
export default instituteSlice.reducer;

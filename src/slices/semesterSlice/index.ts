import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "@config/config";
import { AxiosPrivateService } from "@utils/apiService";
import { RequestState } from "@utils/enums";

export interface Semester {
  year: string;
  sem: string;
  instituteId: string;
}
export interface SemesterCreatePayload {
  semesters: Semester[];
}

export interface SemesterState {
  status: RequestState;
  createStatus: RequestState;
  error: string | null;
  paginatedResponse: PaginatedResponse;
}

interface PaginatedResponse {
  data: Semester[];
  totalRecords: number;
  currentPage: number;
  pageSize: number;
}

const initialState: SemesterState = {
  status: RequestState.IDLE,
  createStatus: RequestState.IDLE,
  error: null,
  paginatedResponse: {
    currentPage: 0,
    data: [],
    pageSize: 10,
    totalRecords: 0,
  },
};

const batchSlice = createSlice({
  name: "semester",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSemester.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(createSemester.fulfilled, (state) => {
        state.createStatus = RequestState.SUCCEEDED;
      })
      .addCase(createSemester.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });

    builder
      .addCase(getSemesters.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(
        getSemesters.fulfilled,
        (state, action: PayloadAction<{ data: PaginatedResponse }>) => {
          state.paginatedResponse = action.payload.data;
          state.createStatus = RequestState.SUCCEEDED;
        }
      )
      .addCase(getSemesters.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });
  },
});

export const getSemesters = createAsyncThunk(
  "semester/getSemesters",
  async ({
    instituteId,
    page = 1,
    pageSize = 10,
  }: {
    instituteId: string;
    page?: number;
    pageSize?: number;
  }) => {
    return new Promise<any>((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("instituteId", instituteId);
      params.append("page", page.toString());
      params.append("pageSize", pageSize.toString());
      AxiosPrivateService.getInstance()
        .get(`${AppConfig.serviceUrls.semester}?${params.toString()}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const createSemester = createAsyncThunk(
  "semester/createSemester",
  async (semester: Semester) => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .post(AppConfig.serviceUrls.semester, semester)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const {} = batchSlice.actions;
export default batchSlice.reducer;

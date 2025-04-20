import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "@config/config";
import { AxiosPrivateService } from "@utils/apiService";
import { RequestState } from "@utils/enums";

export interface Result {
  semesterId: string;
  subjectId: string;
  studentId: string;
  grade: string;
}

interface CreateResultPayload {
  indexNumber: string;
  grade: string;
  subjectId: string;
  semesterId: string;
}

export interface ResultState {
  status: RequestState;
  createStatus: RequestState;
  error: string | null;
  results: Result[];
}

const initialState: ResultState = {
  status: RequestState.IDLE,
  createStatus: RequestState.IDLE,
  error: null,
  results: [],
};

const batchSlice = createSlice({
  name: "result",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addResult.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(addResult.fulfilled, (state) => {
        state.createStatus = RequestState.SUCCEEDED;
      })
      .addCase(addResult.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });

    builder
      .addCase(getResults.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(
        getResults.fulfilled,
        (state, action: PayloadAction<{ data: Result[] }>) => {
          state.results = action.payload.data;
          state.createStatus = RequestState.SUCCEEDED;
        }
      )
      .addCase(getResults.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });
  },
});

export const getResults = createAsyncThunk(
  "result/getResults",
  async ({ instituteId }: { instituteId: string }) => {
    return new Promise<any>((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("instituteId", instituteId);
      AxiosPrivateService.getInstance()
        .get(`${AppConfig.serviceUrls.result}?${params.toString()}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const addResult = createAsyncThunk(
  "result/addResult",
  async (result: CreateResultPayload) => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .post(AppConfig.serviceUrls.result, result)
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

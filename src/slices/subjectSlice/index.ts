import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "@config/config";
import { AxiosPrivateService } from "@utils/apiService";
import { RequestState } from "@utils/enums";

export interface Subject {
  id: string;
  name: string;
  code: string;
  credit: string;
  instituteId: string;
  type: string;
}
export interface SubjectCreatePayload {
  subjects: Subject[];
}

export interface SubjectState {
  status: RequestState;
  createStatus: RequestState;
  error: string | null;
  subjects: Subject[];
}

const initialState: SubjectState = {
  status: RequestState.IDLE,
  createStatus: RequestState.IDLE,
  error: null,
  subjects: [],
};

const batchSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubjects.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(createSubjects.fulfilled, (state) => {
        state.createStatus = RequestState.SUCCEEDED;
      })
      .addCase(createSubjects.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });

    builder
      .addCase(getSubjects.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(
        getSubjects.fulfilled,
        (state, action: PayloadAction<{ data: Subject[] }>) => {
          state.subjects = action.payload.data;
          state.createStatus = RequestState.SUCCEEDED;
        }
      )
      .addCase(getSubjects.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });
  },
});

export const getSubjects = createAsyncThunk(
  "subject/getSubjects",
  async ({
    instituteId = "67e2bd370b72702dfca67020",
    page = 1,
    pageSize = 10,
  }: {
    instituteId?: string;
    page?: number;
    pageSize?: number;
  }) => {
    return new Promise<any>((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("instituteId", instituteId);
      params.append("page", page.toString());
      params.append("pageSize", pageSize.toString());
      AxiosPrivateService.getInstance()
        .get(`${AppConfig.serviceUrls.subject}?${params.toString()}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const createSubjects = createAsyncThunk(
  "subject/createSubjects",
  async (subjects: Subject[]) => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .post(AppConfig.serviceUrls.subject + "multi-add", subjects)
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

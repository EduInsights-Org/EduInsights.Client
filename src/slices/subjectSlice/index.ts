import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "@config/config";
import { AxiosPrivateService } from "@utils/apiService";
import { RequestState } from "@utils/enums";

export interface Subject {
  name: string;
  code: string;
  credit: string;
}
export interface SubjectCreatePayload {
  subjects: Subject[];
}

export interface SubjectState {
  status: RequestState;
  createStatus: RequestState;
  subjects: Subject[] | null;
  error: string | null;
}

const initialState: SubjectState = {
  status: RequestState.IDLE,
  createStatus: RequestState.IDLE,
  error: null,
  subjects: null,
};

const batchSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubject.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(createSubject.fulfilled, (state) => {
        state.createStatus = RequestState.SUCCEEDED;
      })
      .addCase(createSubject.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });

    builder
      .addCase(getAllSubjects.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(
        getAllSubjects.fulfilled,
        (state, action: PayloadAction<{ data: Subject[] }>) => {
          state.subjects = action.payload.data;
          state.createStatus = RequestState.SUCCEEDED;
        }
      )
      .addCase(getAllSubjects.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });
  },
});

export const getAllSubjects = createAsyncThunk(
  "subject/getAllSubjects",
  async () => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .get(AppConfig.serviceUrls.subject)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const createSubject = createAsyncThunk(
  "subject/createSubject",
  async (subjects: SubjectCreatePayload) => {
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

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "@config/config";
import { AxiosPrivateService } from "@utils/apiService";
import { RequestState } from "@utils/enums";

interface Student {
  indexNumber: string;
  id: string;
}
export interface StudentState {
  status: RequestState;
  students: Student[] | null;
  error: string | null;
}

const initialState: StudentState = {
  status: RequestState.IDLE,
  error: null,
  students: [],
};

const instituteSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentByBatch.pending, (state) => {
        state.status = RequestState.LOADING;
      })
      .addCase(
        getStudentByBatch.fulfilled,
        (state, action: PayloadAction<{ data: Student[] }>) => {
          state.students = action.payload.data;
          state.status = RequestState.SUCCEEDED;
        }
      )
      .addCase(getStudentByBatch.rejected, (state) => {
        state.status = RequestState.FAILED;
      });
  },
});

export const getStudentByBatch = createAsyncThunk(
  "institute/getStudentByBatch",
  async (batchId: string) => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .get(`${AppConfig.serviceUrls.student}findByBatch/${batchId}`)
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

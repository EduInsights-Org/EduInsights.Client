import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "@config/config";
import { AxiosPrivateService } from "@utils/apiService";
import { RequestState } from "@utils/enums";

interface Institute {
  name: string;
  id: string;
}
export interface InstituteState {
  status: RequestState;
  institute: Institute | null;
  error: string | null;
}

const initialState: InstituteState = {
  status: RequestState.IDLE,
  error: null,
  institute: null,
};

const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInstituteById.pending, (state) => {
        state.status = RequestState.LOADING;
      })
      .addCase(
        getInstituteById.fulfilled,
        (state, action: PayloadAction<{ data: Institute }>) => {
          state.institute = action.payload.data;
          state.status = RequestState.SUCCEEDED;
        }
      )
      .addCase(getInstituteById.rejected, (state) => {
        state.status = RequestState.FAILED;
      });
  },
});

export const getInstituteById = createAsyncThunk(
  "institute/getInstituteById",
  async (userId: string) => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .get(AppConfig.serviceUrls.institute + userId)
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

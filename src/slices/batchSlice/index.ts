import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "../../config/config";
import { AxiosPrivateService } from "../../utils/apiService";
import { RequestState } from "../../utils/types";

export interface Batch {
  name: string;
  id: string;
}
export interface BatchCreatePayload {
  name: string;
  instituteId: string;
}
interface BatchState {
  status: RequestState;
  createStatus: RequestState;
  batches: Batch[] | null;
  selectedBatchId: string | null;
  error: string | null;
}

const initialState: BatchState = {
  status: RequestState.IDLE,
  createStatus: RequestState.IDLE,
  error: null,
  batches: null,
  selectedBatchId: null,
};

const batchSlice = createSlice({
  name: "batch",
  initialState,
  reducers: {
    selectBatch(state, action: PayloadAction<string>) {
      state.selectedBatchId = action.payload;
    },
    resetBatchStore(state) {
      (state.batches = null), (state.selectedBatchId = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBatchesByInstituteId.pending, (state) => {
        state.status = RequestState.LOADING;
      })
      .addCase(
        getBatchesByInstituteId.fulfilled,
        (state, action: PayloadAction<{ data: Batch[] }>) => {
          state.batches = action.payload.data;
          state.status = RequestState.SUCCEEDED;
        }
      )
      .addCase(getBatchesByInstituteId.rejected, (state) => {
        state.status = RequestState.FAILED;
      })

      .addCase(createBatch.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(
        createBatch.fulfilled,
        (state, action: PayloadAction<{ data: Batch }>) => {
          const batches: Batch[] = state.batches || [];
          state.batches = [...batches, action.payload.data];
          state.createStatus = RequestState.SUCCEEDED;
        }
      )
      .addCase(createBatch.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });
  },
});

export const getBatchesByInstituteId = createAsyncThunk(
  "batch/getBatchesByInstituteId",
  async (userId: string) => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .get(AppConfig.serviceUrls.batch + userId)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const createBatch = createAsyncThunk(
  "batch/createBatch",
  async (batch: BatchCreatePayload) => {
    return new Promise<any>((resolve, reject) => {
      AxiosPrivateService.getInstance()
        .post(AppConfig.serviceUrls.batch, batch)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const { selectBatch, resetBatchStore } = batchSlice.actions;
export default batchSlice.reducer;

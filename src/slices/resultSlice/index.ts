import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppConfig } from "@config/config";
import { AxiosPrivateService } from "@utils/apiService";
import { RequestState } from "@utils/enums";

export interface Result {
  semester: string;
  subjectName: string;
  subjectCode: string;
  indexNumber: string;
  grade: string;
  batch: string;
}

export interface GradeDistributionResponse {
  aPlus: number;
  a: number;
  aMinus: number;
  bPlus: number;
  b: number;
  bMinus: number;
  cPlus: number;
  c: number;
  cMinus: number;
  dPlus: number;
  d: number;
  dMinus: number;
  e: number;
}

export interface CreateResultPayload {
  indexNumber: string;
  grade: string;
  subjectId: string;
  semesterId: string;
  instituteId: string;
}

export interface StudentGPA {
  indexNumber: string;
  batch: string;
  gpa: number;
  firstName: string;
  lastName: string;
  subjectCount: string;
}
export interface BatchGPAInfo {
  batchId: string;
  batchName: string;
  averageGpa: number;
  studentCount: number;
  totalStudentsInBatch: number;
}
export interface ResultState {
  status: RequestState;
  createStatus: RequestState;
  error: string | null;
  results: Result[];
  studentsGPAs: StudentGPA[];
  gradeDistribution: GradeDistributionResponse;
  batchGPAInfo: BatchGPAInfo[];
}

const initialState: ResultState = {
  status: RequestState.IDLE,
  createStatus: RequestState.IDLE,
  error: null,
  results: [],
  studentsGPAs: [],
  batchGPAInfo: [],
  gradeDistribution: {
    aPlus: 0,
    a: 0,
    aMinus: 0,
    bPlus: 0,
    b: 0,
    bMinus: 0,
    cPlus: 0,
    c: 0,
    cMinus: 0,
    dPlus: 0,
    d: 0,
    dMinus: 0,
    e: 0,
  },
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

    builder
      .addCase(getGradeDistribution.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(
        getGradeDistribution.fulfilled,
        (state, action: PayloadAction<{ data: GradeDistributionResponse }>) => {
          state.gradeDistribution = action.payload.data;
          state.createStatus = RequestState.SUCCEEDED;
        }
      )
      .addCase(getGradeDistribution.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });

    builder
      .addCase(getStudentsGPAs.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(
        getStudentsGPAs.fulfilled,
        (state, action: PayloadAction<{ data: StudentGPA[] }>) => {
          state.studentsGPAs = action.payload.data;
          state.createStatus = RequestState.SUCCEEDED;
        }
      )
      .addCase(getStudentsGPAs.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });

    builder
      .addCase(getBatchAverageGPAs.pending, (state) => {
        state.createStatus = RequestState.LOADING;
      })
      .addCase(
        getBatchAverageGPAs.fulfilled,
        (state, action: PayloadAction<{ data: BatchGPAInfo[] }>) => {
          state.batchGPAInfo = action.payload.data;
          state.createStatus = RequestState.SUCCEEDED;
        }
      )
      .addCase(getBatchAverageGPAs.rejected, (state) => {
        state.createStatus = RequestState.FAILED;
      });
  },
});

export const getResults = createAsyncThunk("result/getResults", async () =>
  // { instituteId }: { instituteId: string }
  {
    return new Promise<any>((resolve, reject) => {
      // const params = new URLSearchParams();
      // params.append("instituteId", instituteId);
      AxiosPrivateService.getInstance()
        // .get(`${AppConfig.serviceUrls.result}?${params.toString()}`)
        .get(`${AppConfig.serviceUrls.result}`)
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

export const getGradeDistribution = createAsyncThunk(
  "result/getGradeDistribution",
  async ({ instituteId }: { instituteId: string }) => {
    return new Promise<any>((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("instituteId", instituteId);

      AxiosPrivateService.getInstance()
        .get(
          `${
            AppConfig.serviceUrls.result
          }grade-distribution?${params.toString()}`
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

export const getStudentsGPAs = createAsyncThunk(
  "result/getStudentsGPAs",
  async ({
    instituteId,
    batchId,
  }: {
    instituteId: string;
    batchId?: string;
  }) => {
    return new Promise<any>((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("instituteId", instituteId);
      if (batchId) {
        params.append("batchId", batchId);
      }

      AxiosPrivateService.getInstance()
        .get(`${AppConfig.serviceUrls.result}students-gpa?${params.toString()}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const getBatchAverageGPAs = createAsyncThunk(
  "result/getBatchAverageGPAs",
  async ({ instituteId }: { instituteId: string }) => {
    return new Promise<any>((resolve, reject) => {
      const params = new URLSearchParams();
      params.append("instituteId", instituteId);

      AxiosPrivateService.getInstance()
        .get(`${AppConfig.serviceUrls.result}average-gpas?${params.toString()}`)
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

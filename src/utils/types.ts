export enum Role {
  SuperAdmin = "SUPER_ADMIN",
  Admin = "ADMIN",
  dataEntry = "DATA_ENTRY",
  Student = "STUDENT",
}

export enum RequestState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

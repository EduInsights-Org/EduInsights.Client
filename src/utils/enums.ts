export enum ErrorCode {
  // Default
  UnDefinedError = 0,

  // Authentication & Authorization
  EmailNotVerified = 1,
  InvalidCredentials = 2,
  AccountLocked = 3,
  AccessDenied = 4,
  InvalidToken = 5,
  TokenRequired = 6,

  // Validation
  ValidationError = 7,
  MissingRequiredField = 8,
  InvalidEmailFormat = 9,
  PasswordTooWeak = 10,

  // User Management
  UserNotFound = 11,
  UserAlreadyExists = 12,
  InvalidUserRole = 13,

  // Resource Management
  ResourceNotFound = 14,
  ResourceAlreadyExists = 15,
  ResourceLimitExceeded = 16,

  // System & Server
  InternalServerError = 17,
  ServiceUnavailable = 18,
  DatabaseError = 19,
  NetworkError = 20,

  // Payment & Subscription
  PaymentFailed = 21,
  SubscriptionExpired = 22,
  InvalidPaymentMethod = 23,

  // Third-Party Integration
  ThirdPartyApiError = 24,
  ExternalServiceUnavailable = 25,

  // Custom Business Logic
  InvalidOperation = 26,
  QuotaExceeded = 27,
  InvalidInvitationCode = 28,
}

export enum Role {
  SuperAdmin = "SUPER_ADMIN",
  Admin = "ADMIN",
  dataEntry = "DATA_ENTRY",
  Student = "STUDENT",
}

export enum SubjectType {
  compulsory = "COMPULSORY",
  elective = "ELECTIVE",
}

export enum YearType {
  I = "I",
  II = "II",
  III = "III",
  IV = "IV",
  V = "V",
}
export enum SemesterType {
  I = "I",
  II = "II",
}

export enum RequestState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

export type GPAClass =
  | "First Class"
  | "Second Upper Class"
  | "Second Lower Class"
  | "Pass Class"
  | "Fail";

export type GPAColor = "blue" | "sky" | "lime" | "amber" | "red";

// Set the application name
export const APP_NAME: string = "EduInsights";

declare global {
  interface Window {
    config: {
      BACKEND_BASE_URL: string;
      DEPLOYED_ENVIRONMENT: string;
    };
  }
}

export const ServiceBaseUrl = window.config
  ? window.config.BACKEND_BASE_URL
  : "http://localhost:5269/api/v1";

export const AppConfig = {
  serviceUrls: {
    register: ServiceBaseUrl + "/auth/register",
    login: ServiceBaseUrl + "/auth/login",
    user: ServiceBaseUrl + "/users/",
    institute: ServiceBaseUrl + "/institutes/",
    batch: ServiceBaseUrl + "/batches/",
    userInfo: ServiceBaseUrl + "/user/basic-information/",
    refreshToken: ServiceBaseUrl + "/auth/refresh",
    logout: ServiceBaseUrl + "/auth/logout",
  },
};

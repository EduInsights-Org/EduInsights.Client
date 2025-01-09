import axios, { AxiosInstance } from "axios";

export class AxiosPrivateService {
  private static _instance: AxiosInstance;
  private static _accessToken: string;

  constructor(accessToken: string) {
    AxiosPrivateService._instance = axios.create();
    AxiosPrivateService._accessToken = accessToken;
    AxiosPrivateService.configureRequestInterceptor();
  }

  public static getInstance(): AxiosInstance {
    return AxiosPrivateService._instance;
  }

  private static configureRequestInterceptor() {
    AxiosPrivateService._instance.interceptors.request.use(
      (config) => {
        config.headers.set(
          "Authorization",
          "Bearer " + AxiosPrivateService._accessToken
        );
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}

export class AxiosPublicService {
  private static _instance: AxiosInstance;

  constructor() {
    AxiosPublicService._instance = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  public static getInstance(): AxiosInstance {
    return AxiosPublicService._instance;
  }
}

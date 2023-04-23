import { AxiosInstance } from "axios";

export class InterceptorService {
  public constructor(private _axiosInstance: AxiosInstance) {}

  public addRequestInterceptor(): InterceptorService {
    this._axiosInstance.interceptors.request.use(
      (config) => {
        console.info(`Request: ${config.method?.toUpperCase()} ${config.url}`);
        if (["post", "put", "delete"].includes(config.method || "")) {
          // LoaderService.instance.showLoader();
        }
        return config;
      },
      (error) => {
        console.error(`Request: ${error.config.method?.toUpperCase()} ${error.config.url} failed`);
        return Promise.reject(error);
      }
    );
    return this;
  }

  public addResponseInterceptor(): InterceptorService {
    this._axiosInstance.interceptors.response.use(
      (response) => {
        console.info(
          `Response: ${response.config.method?.toUpperCase()} ${response.config.url} succeeded`
        );
        if (["post", "put", "delete"].includes(response.config.method || "")) {
          if (response.data && response.data.message) {
            // AlertService.instance.successMessage(response.data.message);
          } else {
            // AlertService.instance.successMessage("Saved successfully");
          }
        }
        // LoaderService.instance.hideLoader();
        return response;
      },
      (error) => {
        console.error(`Response: ${error.config.method?.toUpperCase()} ${error.config.url} failed`);
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            // AlertService.instance.errorMessage(error.response.data.message);
          } else {
            // AlertService.instance.errorMessage("Something went wrong");
          }
        }
        // LoaderService.instance.hideLoader();
        return Promise.reject(error);
      }
    );
    return this;
  }
}

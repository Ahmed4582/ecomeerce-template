import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "";

// Endpoints that do not require Authorization
const PUBLIC_ENDPOINTS = [
  "/Auth/Login",
  "/Auth/Register",
  "/Auth/ForgetPassword",
  "/Auth/ResetPassword",
  "/Auth/VerificationAccount",
  "/Auth/ResendActivationCode",
  "/Auth/RefreshToken",
];

const isPublicEndpoint = (url = "") =>
  PUBLIC_ENDPOINTS.some((ep) => url.includes(ep));

class AxiosClient {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 15000,
    });

    this.isRefreshing = false;
    this.refreshSubscribers = [];

    this._initializeInterceptors();
  }

  _initializeInterceptors() {
    // ================= REQUEST =================
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        // Only attach Authorization for protected endpoints
        if (token && !isPublicEndpoint(config.url)) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // FormData support
        if (config.data instanceof FormData) {
          delete config.headers["Content-Type"];
        } else {
          config.headers["Content-Type"] = "application/json";
        }

        // Language header (if your backend uses it)
        const rawLang =
          (localStorage.getItem("i18nextLng") ||
            localStorage.getItem("lang") ||
            "en") + "";
        const lang = rawLang.toLowerCase().startsWith("ar") ? "ar" : "en";
        config.headers["accept-language"] = lang;

        return config;
      },
      (error) => Promise.reject(error)
    );

    // ================= RESPONSE =================
    this.client.interceptors.response.use(
      (response) => {
        const res = response.data;

        // Normalize API response shape
        if (res?.isSucceeded === false) {
          return Promise.reject({
            message: res.messageEn || res.messageAr || "Request failed",
            raw: res,
          });
        }

        return res.data;
      },
      async (error) => {
        const originalRequest = error.config;

        // ===== 401 → Refresh Token =====
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isPublicEndpoint(originalRequest.url)
        ) {
          originalRequest._retry = true;

          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.client(originalRequest));
              });
            });
          }

          this.isRefreshing = true;

          try {
            const oldToken = localStorage.getItem("token");
            if (!oldToken) throw new Error("No token");

            const newAuth = await this._refreshToken(oldToken);

            localStorage.setItem("token", newAuth.token);
            localStorage.setItem("refreshToken", newAuth.refresh_Token);

            this.refreshSubscribers.forEach((cb) =>
              cb(newAuth.token)
            );
            this.refreshSubscribers = [];

            originalRequest.headers.Authorization =
              `Bearer ${newAuth.token}`;

            return this.client(originalRequest);
          } catch (err) {
            this._clearAuth();
            return Promise.reject(err);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(this._normalizeError(error));
      }
    );
  }

  // ================= Refresh Token =================
  async _refreshToken(token) {
    const res = await axios.post(
      `${BASE_URL}/Auth/RefreshToken?token=${token}`
    );

    if (!res.data?.isSucceeded) {
      throw new Error("Refresh token failed");
    }

    return res.data.data;
  }

  _clearAuth() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }

  _normalizeError(error) {
    if (!error.response) {
      return {
        message: "Network error",
        raw: error,
      };
    }

    return {
      status: error.response.status,
      message:
        error.response.data?.messageEn ||
        error.response.data?.messageAr ||
        "Unexpected error",
      raw: error.response.data,
    };
  }

  // ================= HTTP METHODS =================
  get(url, config) {
    return this.client.get(url, config);
  }

  post(url, data, config) {
    return this.client.post(url, data, config);
  }

  put(url, data, config) {
    return this.client.put(url, data, config);
  }

  delete(url, config) {
    return this.client.delete(url, config);
  }
}

const api = new AxiosClient();
export default api;

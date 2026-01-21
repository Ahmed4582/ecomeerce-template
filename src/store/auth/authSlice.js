import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../api/authApi";

const storedAuth = JSON.parse(localStorage.getItem("auth")) || null;

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      return await loginApi(payload);
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedAuth?.user || null,
    token: storedAuth?.token || null,
    refreshToken: storedAuth?.refreshToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== LOGIN =====
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const data = action.payload;

        state.loading = false;
        state.user = {
          user_Id: data.user_Id,
          email: data.email,
          role: data.role_Name,
        };
        state.token = data.token;
        state.refreshToken = data.refresh_Token;

        // AxiosClient reads these keys
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refresh_Token);

        // Persist auth state
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.user,
            token: data.token,
            refreshToken: data.refresh_Token,
          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

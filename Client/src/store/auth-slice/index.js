import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        console.log(action.payload.user);
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(verifyEmail.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });;
  },
});

export const checkUserAuth = createAsyncThunk("/auth/check-auth", async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formdata) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/create-user",
      formdata,
      { withCredentials: true }
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login-user",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login-user",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const verifyEmail = createAsyncThunk(
  "/auth/verify-email",
  async (otp) => {
    const token = sessionStorage.getItem("verificationToken");
    console.log("otptoken ", token);
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/verify-user",
      { otp: otp },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json", // Optional: set content type if needed
        },
      },
      { withCredentials: true }
    );

    return response.data;
  }
);

export const  logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/auth/logout-user",
    {},
    { withCredentials: true }
  );
  return response.data;
});

export const { setUser } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:3000/api/v1/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchallproducts",
  async () => {
    const result = await axios.get(
      "http://localhost:3000/api/v1/admin/products/get"
    );
    return result?.data;
  }
);

export const editAProduct = createAsyncThunk(
  "/products/editaproduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:3000/api/v1/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:3000/api/v1/admin/products/delete/${id}`
    );
    return result?.data;
  }
);
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;
        state.productList = [];
      })
      //   .addCase(addNewProduct.pending, (state, action) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(addNewProduct.fulfilled, (state, action) => {
      //     console.log(action.payload);
      //     state.isLoading = false;
      //     state.productList = action.payload.data;
      //   })
      //   .addCase(addNewProduct.rejected, (state, action) => {
      //     //console.log(action.payload);
      //     state.isLoading = false;
      //     state.productList = [];
      //   })
      .addCase(editAProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editAProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(editAProduct.rejected, (state, action) => {
        //console.log(action.payload);
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        //console.log(action.payload);
        state.isLoading = false;
        state.productList = [];
      });
  },
});

const adminProductsSlice = AdminProductsSlice.reducer;
export { adminProductsSlice };

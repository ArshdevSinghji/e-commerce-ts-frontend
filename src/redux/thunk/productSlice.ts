import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosInstance } from "../../services/AxiosInstance";

export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async (id: number) => {
    try {
      const res = await AxiosInstance.get(`/${id}`);
      return res.data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch product by ID");
    }
  }
);

interface ProductState {
  title: string;
  price: number;
  thumbnail: string;
  brand: string;
  description: string;
  isLoading: boolean;
}

const initialState: ProductState = {
  title: "",
  price: 0,
  thumbnail: "",
  brand: "",
  description: "",
  isLoading: true,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductState>) => {
      state.title = action.payload.title;
      state.price = action.payload.price;
      state.thumbnail = action.payload.thumbnail;
      state.brand = action.payload.brand;
      state.description = action.payload.description;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<ProductState>) => {
          console.log("Product fetched successfully");
          state.isLoading = false;
          state.title = action.payload.title;
          state.price = action.payload.price;
          state.thumbnail = action.payload.thumbnail;
          state.brand = action.payload.brand;
          state.description = action.payload.description;
        }
      )
      .addCase(fetchProductById.rejected, (state) => {
        console.error("Failed to fetch product");
        state.isLoading = false;
        state.title = "";
        state.price = 0;
        state.thumbnail = "";
        state.brand = "";
        state.description = "";
      })
      .addCase(fetchProductById.pending, (state) => {
        console.log("Fetching product...");
        state.isLoading = true;
        state.title = "";
        state.price = 0;
        state.thumbnail = "";
        state.brand = "";
        state.description = "";
      });
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;

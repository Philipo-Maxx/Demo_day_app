import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./auth-slice";
import { adminProductsSlice } from "./admin/product-slice";
import { shoppingProduct } from "./shop/product-slice";
import { shopCartSlice } from "./shop/cart-slice";
import { commonFeatureSlice } from "./common";
import { reviewProductSlice } from "./shop/review-slice";
import { shoppingOrder } from "./shop/order-slice";
import { addressShopSlice } from "./shop/address-slice";
import { adminOrder } from "./admin/order-slice";
import { searchShopSlice } from "./shop/search-slice";

export const store = configureStore({
  reducer: {
    //auth
    auth: authSliceReducer,

    //admin
    adminProducts: adminProductsSlice,
    adminShopOrder: adminOrder,

    //shop
    shopProducts: shoppingProduct,
    shopCart: shopCartSlice,
    review: reviewProductSlice,
    shopOrder: shoppingOrder,
    addressShop: addressShopSlice,
    searchShop: searchShopSlice,

    //common
    commonFeature: commonFeatureSlice,
  },
});

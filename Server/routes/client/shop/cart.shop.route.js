import {
  addToCart,
  fetchCartItem,
  updateCartItem,
  deleteCartItem,
} from "../../../controllers/client/shop/cart-controller.js";

import { Router } from "express";

const cartRouter = Router();
cartRouter.post("/add", addToCart);
cartRouter.get("/get/:userId", fetchCartItem);
cartRouter.put("/update-cart", updateCartItem);
cartRouter.delete("/:userId/:productId", deleteCartItem);

export { cartRouter };

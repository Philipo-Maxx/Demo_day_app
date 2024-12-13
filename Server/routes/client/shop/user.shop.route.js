import { Router } from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../../../controllers/client/shop/product-controller.js";

const shopRouter = Router();

shopRouter.get("/get", getFilteredProducts);

shopRouter.get("/get/:id", getProductDetails);

export { shopRouter };

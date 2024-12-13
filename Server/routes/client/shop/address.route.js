import { Router } from "express";

import {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} from "../../../controllers/client/shop/address-controller.js";

const addressRouter = Router();

addressRouter.post("/add", addAddress);
addressRouter.get("/get/:userId", fetchAllAddress);
addressRouter.delete("/delete/:userId/:addressId", deleteAddress);
addressRouter.put("/update/:userId/:addressId", editAddress);

export { addressRouter };

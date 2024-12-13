
import { Router } from "express";

// const {
//   createOrder,
//   getAllOrdersByUser,
//   getOrderDetails,
//   capturePayment,
// } = require("../../controllers/shop/order-controller");

import {
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} from "../../../controllers/client/shop/order-controllers.js";

const shopOrderRouter = Router();

// shopOrderRouter.post("/create", createOrder);
shopOrderRouter.post("/capture", capturePayment);
shopOrderRouter.get("/list/:userId", getAllOrdersByUser);
shopOrderRouter.get("/details/:id", getOrderDetails);

export { shopOrderRouter };

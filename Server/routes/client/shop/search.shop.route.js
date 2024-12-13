import { Router } from "express";

import { searchProducts } from "../../../controllers/client/shop/search-controller.js";

const searchRouter = Router();

searchRouter.get("/:keyword", searchProducts);

export { searchRouter };

import express from "express";
import CartRouter from "./cart.router";
import ProductRouter from "./product.router";
import UserRouter from "./user.router";
import WishlistRouter from "./wishlist.router";
import OrderRouter from "./order.router";
import FileUpdloadRouter from "./file.router";
import CategoryRouter from "./category.router";

const routers = express.Router();

routers.use("/product", ProductRouter);

routers.use("/category", CategoryRouter);

routers.use("/cart", CartRouter);

routers.use("/user", UserRouter);

routers.use("/wishlist", WishlistRouter);

routers.use("/order", OrderRouter);

// routers.use("/file", FileUpdloadRouter);

export default routers;

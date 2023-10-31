import express from "express";
import CartRouter from "./cart.router";
import CatalogRouter from "./catalog.router";
import UserRouter from "./user.router";
import WishlistRouter from "./wishlist.router";
import OrderRouter from "./order.router";
import FileUpdloadRouter from "./file.router";

const routers = express.Router();

routers.use("/catalog", CatalogRouter);

routers.use("/category", CatalogRouter);

routers.use("/cart", CartRouter);

routers.use("/user", UserRouter);

routers.use("/wishlist", WishlistRouter);

routers.use("/order", OrderRouter);

routers.use("/file", FileUpdloadRouter);

export default routers;

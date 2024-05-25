import {Router} from "express";
import userRoutes from "./users-routes.js";
import propertyRoutes from "./property-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes);
appRouter.use("/property", propertyRoutes);

export default appRouter;
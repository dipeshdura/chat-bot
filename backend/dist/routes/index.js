import express from "express";
import userRoutes from "./user.route.js";
import chatRoutes from "./chat.route.js";
const appRouter = express.Router();
appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/chats", chatRoutes); //domain/api/v1/chats
export default appRouter;
//# sourceMappingURL=index.js.map
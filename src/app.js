import morgan from "morgan";
import { dbConnection } from "./DB/dbConnection.js";
import { globalError } from "./middleware/errorMiddleware.js";
import cors from "cors";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
export const bootstrap = async (app, express) => {
    app.use(express.json());
    app.use(morgan('dev'))
    app.use(cors())
    await dbConnection();


    app.use('/auth',authRouter);
    app.use('/user',userRouter);

    app.all("*", (req, res, next) => {
        return next(new Error(`Route ${req.originalUrl} Not Found!!`, { cause: 400 }));
      });
    app.use(globalError)
}
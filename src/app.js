import { dbConnection } from "./DB/dbConnection.js";

export const bootstrap = async (app, express) => {
    app.use(express.json());

    await dbConnection();
}
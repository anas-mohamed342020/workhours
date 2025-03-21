import express from 'express';
import { bootstrap } from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

await bootstrap(app, express);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

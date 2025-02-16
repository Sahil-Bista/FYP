import express from "express";
import {serverSetupMiddlewares} from "./middlewares/serverSetupMiddleware.js";
import {uploadFileSetUpService} from "./services/fileUpload.js";
import routesSetup from "./routes/index.js"

const app = express();

serverSetupMiddlewares(app);
uploadFileSetUpService(app);
routesSetup(app);

export default app;

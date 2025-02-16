import { userRouter } from "./UserRouter.js";

const routesSetup = (app) =>{
    app.use('/api/user/', userRouter);
}

export default routesSetup;
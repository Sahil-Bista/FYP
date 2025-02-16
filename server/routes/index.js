import { futsalRouter } from "./FutsalRouter.js";
import { userRouter } from "./UserRouter.js";

const routesSetup = (app) =>{
    app.use('/api/user/', userRouter);
    app.use('/api/futsal', futsalRouter)
}

export default routesSetup;
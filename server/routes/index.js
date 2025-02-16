import { bookingRouter } from "./BookingRouter.js";
import { futsalRouter } from "./FutsalRouter.js";
import { userRouter } from "./UserRouter.js";

const routesSetup = (app) =>{
    app.use('/api/user/', userRouter);
    app.use('/api/futsal/', futsalRouter)
    app.use('/api/booking/', bookingRouter)
}

export default routesSetup;
import { bookingRouter } from "./BookingRouter.js";
import { chatRouter } from "./ChatRouter.js";
import { futsalRouter } from "./FutsalRouter.js";
import { paymentRouter } from "./PaymentRouter.js";
import { userRouter } from "./UserRouter.js";

const routesSetup = (app) =>{
    app.use('/api/user', userRouter);
    app.use('/api/futsal', futsalRouter);
    app.use('/api/booking', bookingRouter);
    app.use('/api/payment', paymentRouter)
    app.use('/api/chat', chatRouter)
}

export default routesSetup;
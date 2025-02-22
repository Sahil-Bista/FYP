import { Router } from "express";
import { createBooking, deleteBooking, getFilteredBooking, getFutsalSpecificBooking, getParticularBooking ,getVendorSpecificFutsalBookings} from "../controllers/BookingController.js";
import authentication from "../middlewares/authentication.js";

export const bookingRouter = Router();

bookingRouter.get('/:bookingId', authentication, getParticularBooking);
bookingRouter.get('/futsal/:futsalId', authentication, getFutsalSpecificBooking);
bookingRouter.get('/vendorFutsal/:userId', authentication, getVendorSpecificFutsalBookings)
bookingRouter.post('/createBooking',authentication,createBooking);
bookingRouter.post('/searchBookings/:futsalId' , authentication, getFilteredBooking);
bookingRouter.post('/deleteBooking/:bookingId', authentication, deleteBooking)

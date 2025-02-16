import { Router } from "express";
import { createFutsal, upload, getAllFutsals,editStatus, getVendorSpecificFutsal, deleteFutsal, getFutsalById, editFutsal, getPendingFutsals, validateFutsal } from "../controllers/futsalController.js";
import authentication from "../middlewares/authentication.js";

export const futsalRouter = Router();

futsalRouter.get('/', authentication, getAllFutsals);
futsalRouter.get('/pending-futsals',authentication,getPendingFutsals)
futsalRouter.get('/futsalOwner/:user',authentication, getVendorSpecificFutsal)
futsalRouter.get('/:futsalId', authentication, getFutsalById)
futsalRouter.post('/validateFutsal/:futsalId', authentication,validateFutsal)
futsalRouter.post('/addFutsal/:userId',upload.single("image"), createFutsal)
futsalRouter.patch('/editFutsal/:futsalId',authentication,editFutsal)
futsalRouter.patch('/editStatus/:futsalId', authentication, editStatus)
futsalRouter.delete('/deleteFutsal/:futsalId', authentication,deleteFutsal)
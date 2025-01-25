import mongoose, { Types } from "mongoose"
import UserModel from "./User.js";

const futsalSchema = new mongoose.Schema({
    image:{
        type:String,
        required : true
    },
    futsal_name : String,
    futsal_address : String,
    address_link : String,
    futsal_description : String,
    vendorId :{
        type: Types.ObjectId,
        ref : UserModel
    },
    isValid : Boolean
})
const futsalModel = mongoose.model("futsal",futsalSchema);

export default futsalModel;

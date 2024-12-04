import mongoose from "mongoose"

const futsalSchema = new mongoose.Schema({
    image:{
        type:String,
        required : true
    },
    futsal_name : String,
    futsal_address : String,
    futsal_description : String
})
const futsalModel = mongoose.model("futsal",futsalSchema);

export default futsalModel;

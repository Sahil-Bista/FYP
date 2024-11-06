import mongoose, { Mongoose } from 'mongoose';

const teamCaptainSchema = new mongoose.Schema({
    captainId : {
        type : mongoose.Types.ObjectId,
        ref : 'UserModel'
    },
    address : String,
    gender : String,
    email : String,
    contactNumber : Number,
    game_date : Date,
    time : Date,
    team_size : String
})

const teamCaptainModel = mongoose.model("teamcaptain",teamCaptainSchema);

export default teamCaptainModel;
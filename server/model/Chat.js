import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  senderId : {
      type: mongoose.Types.ObjectId,
      ref: 'UserModel',
    },
  receiverId : {
    type: mongoose.Types.ObjectId,
    ref: 'UserModel',
  },
  message : String
}, {
  timestamps: true
})

const chatModel = mongoose.model("chat",chatSchema);

export default chatModel;
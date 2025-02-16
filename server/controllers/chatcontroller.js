const searchChatMembers = async(req, res) =>{
    try {
        const myUserId = req.userId;
        const { searchQuery } = req.body;
        const user = searchQuery.trim();
        if (!user) {
          return res.status(400).json({ error: "User name is required" });
        }
        const foundUser = await UserModel.find({
          name: { $regex: new RegExp(user, "i") },
        });
        const foundUserIds = foundUser.map(user => user._id.toString());
        const userInvolvedMessages = await ChatModel.find({
          $and: [
            { 
              $or: [
                { senderId: new Types.ObjectId(myUserId) },
                { receiverId: new Types.ObjectId(myUserId) }
              ]
            },
            { type: "Room-joined message"}
          ]
        });
        const matchedUserIds = userInvolvedMessages.reduce((uniqueUserIds, message) => {
          const otherUserId = message.senderId.toString() === myUserId 
            ? message.receiverId.toString() 
            : message.senderId.toString();
      
          if (!uniqueUserIds.includes(otherUserId)) {
            uniqueUserIds.push(otherUserId);
          }
          return uniqueUserIds;
        }, []);
        const matchedUserIdsWithChat = foundUserIds
        .filter(userId => matchedUserIds.includes(userId))
        .map(userId => new Types.ObjectId(userId))
        console.log("matchedUserIdsWithChat",matchedUserIdsWithChat);
        const foundUsers = [];
        for (var mUsers of matchedUserIdsWithChat){
          const mUsersFull = await UserModel.find({_id:mUsers})
          for (var element of mUsersFull){
            foundUsers.push(element);
          }
        }
        console.log("foundUser", foundUsers)
        res.json(foundUsers);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
      }
}

const findConnectedUsers = async(req,res) =>{
    const {myUserId} = req.params;
    const userInvolvedMessages = await ChatModel.find({
      $and: [
        { 
          $or: [
            { senderId: new Types.ObjectId(myUserId) },
            { receiverId: new Types.ObjectId(myUserId) }
          ]
        },
        { type: "Room-joined message"}
      ]
    });
    const matchedUserIds = userInvolvedMessages.reduce((uniqueUserIds, message) => {
      const otherUserId = message.senderId.toString() === myUserId 
        ? message.receiverId.toString() 
        : message.senderId.toString();
  
      if (!uniqueUserIds.includes(otherUserId)) {
        uniqueUserIds.push(otherUserId);
      }
  
      return uniqueUserIds;
    }, []);
    const matchedUsers = await UserModel.find({ _id: { $in: matchedUserIds } });
    res.json(matchedUsers);
}

const findUsersMessages = async(req,res) =>{
    const {userId} = req.params
  const myId = req.userId
  const chats = await ChatModel.find({
    receiverId: {$in: [new Types.ObjectId(userId), new Types.ObjectId(myId)]},
    senderId: {$in: [new Types.ObjectId(userId), new Types.ObjectId(myId)]}
  })
  res.json(chats)
}

export {searchChatMembers, findConnectedUsers, findUsersMessages}
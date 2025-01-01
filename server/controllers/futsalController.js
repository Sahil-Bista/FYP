import futsalModel from "../model/Futsal.js"
import { v4 as uuidv4 } from 'uuid';
import multer from "multer";


const uniqueId = uuidv4();
const storage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null, "uploads");
  },
  filename : function(req,file,cb){
    cb(null, uniqueId + "-" + file.originalname)
  },
})

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
    cb(null, true);
  }else{
    cb(null,false);
  }
}

const upload = multer({
  storage : storage,
  limits : {
    fileSize : 1024*1024*5
  },
  fileFilter : fileFilter,
})


const createFutsal = async (req, res) => {
  try {
    const { futsalName, futsalAddress, futsalDescription , addressLink} = req.body;
    const image = req.file.path;
    const futsal = await futsalModel.create({
      image : `${image}`,
      futsal_name: `${futsalName}`,
      futsal_address: `${futsalAddress}`,
      address_link :`${addressLink}`,
      futsal_description: `${futsalDescription}`,
    });
    res.status(201).json({ message: "Futsal created successfully", futsal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding futsal" });
  }
};

const getAllFutsals = async () => {
  try {
    const futsals = await futsalModel.find({});
    res.status(201).json({ message: "Futsal list", futsals });
  } catch (err) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getParticularFutsal = async () => {
  try {
    const { futsalId } = req.params;
    if (!futsalId) {
      return res.status(400).json({ msg: "No such futsal" });
    }
    const futsal = await futsalModel.findOne({ _id: futsalId });
    console.log("Futsals:", futsal);
    return res.status(201).json({ message: "Futsal found", futsal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const deleteFutsal = async (req, res) => {
//   try {
//     const { futsalId } = req.params;
//     if (!futsalId) {
//       return res.status(400).json({ msg: "No such futsal" });
//     }
//     const deletedFutsal = await futsalModel.deleteOne({ _id: futsalId });
//     console.log("Deleted Futsals", deletedFutsal);
//     return res.status(201).json({ message: "Futsal deleted", deleteFutsal });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const editFutsal = async (req, res) => {
  try {
    const {futsalId} = req.params; 
  const updatedData = req.body;  

    const updatedFutsal = await futsalModel.findByIdAndUpdate(futsalId, updatedData, {
      new: true, 
      runValidators: true  // Validation  yet to be done
    });

    if (!updatedFutsal) {
      return res.status(404).json({ message: 'Futsal not found' });
    }

    res.status(200).json({ message: 'Futsal updated successfully', futsal: updatedFutsal });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export { getAllFutsals, createFutsal, getParticularFutsal , editFutsal, upload};

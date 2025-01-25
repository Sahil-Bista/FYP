import futsalModel from "../model/Futsal.js"
import { v4 as uuidv4 } from 'uuid';
import multer from "multer";
import bookingModel from "../model/Booking.js";


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
    const {userId} = req.params;
    console.log(userId)
    const image = req.file.path;

    const existingFutsal = await futsalModel.findOne({
      futsal_name : futsalName,
      address_link: addressLink
    })

    if(existingFutsal){
      return res.status(400).json({message: "Futsal with the same name and address already exists in the system"})
    }
    
    const futsal = await futsalModel.create({
      image : `${image}`,
      futsal_name: `${futsalName}`,
      futsal_address: `${futsalAddress}`,
      address_link :`${addressLink}`,
      futsal_description: `${futsalDescription}`,
      vendorId : `${userId}`,
      isValid : `${false}`
    });
    res.status(201).json({ message: "Futsal created successfully", futsal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding futsal" });
  }
};

const getAllFutsals = async (req,res) => {
  try {
    const futsals = await futsalModel.find({isValid:true});
    res.status(201).json({ message: "Futsal list", futsals });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Internal server error" });
  }
};

const getVendorSpecificFutsal = async (req,res) => {
  try {
    const { user } = req.params;
    const futsal = await futsalModel.find({ vendorId: user});
    if(futsal.length == 0 ){
      return res.status(202).json({ msg: "Add-Futsal" });
    }
    const unValidatedfutsal = await futsalModel.find({vendorId: user, isValid:false})
    if(unValidatedfutsal.length > 0){
      return res.status(201).json({msg : "Futsal yet to be registered"});
    }
    return res.status(200).json({ message: "Futsal found", futsal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteFutsal = async (req, res) => {
  try {
    const { futsalId } = req.params;
    if (!futsalId) {
      return res.status(400).json({ msg: "No such futsal" });
    }
    const deletedFutsal = await futsalModel.deleteOne({ _id: futsalId });
    const deletedBookings = await bookingModel.deleteMany({ futsalId : futsalId});
    console.log("DeletedBooking from futsal", deletedBookings)
    console.log("Deleted Futsals", deletedFutsal);
    return res.status(201).json({ message: "Futsal deleted", deleteFutsal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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



export { getAllFutsals, createFutsal, getVendorSpecificFutsal , editFutsal, upload, deleteFutsal};

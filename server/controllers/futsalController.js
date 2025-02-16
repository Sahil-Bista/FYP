import futsalModel from "../model/Futsal.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import bookingModel from "../model/Booking.js";
import UserModel from "../model/User.js";

const uniqueId = uuidv4();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uniqueId + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const editStatus = async (req, res) => {
  try {
    const { futsalId } = req.params;
    const futsal = await futsalModel.findOne({ _id: futsalId });
    if (!futsal) {
      return res.status(404).json({ message: "Futsal Not Found" });
    }
    const isOpen = futsal.isOpen;
    const negation = !isOpen;
    const updatedFutsal = await futsalModel.findByIdAndUpdate(
      futsalId,
      { isOpen: negation },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Futsal updated successfully", futsal: updatedFutsal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating futsal" });
  }
};

const createFutsal = async (req, res) => {
  try {
    const {
      futsalName,
      futsalAddress,
      futsalDescription,
      addressLink,
      futsalContact,
    } = req.body;
    const { userId } = req.params;
    console.log("file", req.file);
    const image = req.file.path;

    const existingFutsal = await futsalModel.findOne({
      futsal_name: futsalName,
      address_link: addressLink,
    });

    if (existingFutsal) {
      return res
        .status(400)
        .json({
          message:
            "Futsal with the same name and address already exists in the system",
        });
    }

    const futsal = await futsalModel.create({
      image: `${image}`,
      futsal_name: `${futsalName}`,
      futsal_address: `${futsalAddress}`,
      address_link: `${addressLink}`,
      futsal_description: `${futsalDescription}`,
      vendorId: `${userId}`,
      isValid: `${false}`,
      isOpen: true,
      futsal_contact: `${futsalContact}`,
    });
    res.status(201).json({ message: "Futsal created successfully", futsal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding futsal" });
  }
};

const getAllFutsals = async (req, res) => {
  try {
    const futsals = await futsalModel.find({ isValid: true });
    res.status(201).json({ message: "Futsal list", futsals });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Internal server error" });
  }
};

const getVendorSpecificFutsal = async (req, res) => {
  try {
    const { user } = req.params;
    const futsal = await futsalModel.find({ vendorId: user });
    if (futsal.length == 0) {
      return res.status(202).json({ msg: "Add-Futsal" });
    }
    const unValidatedfutsal = await futsalModel.find({
      vendorId: user,
      isValid: false,
    });
    if (unValidatedfutsal.length > 0) {
      return res.status(201).json({ msg: "Futsal yet to be registered" });
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
    const futsal = await futsalModel.findOne({ _id: futsalId });
    if (!futsal) {
      return res.status(404).json({ message: "Futsal Not Found" });
    }
    const userId = futsal.vendorId;
    const deletedFutsal = await futsalModel.deleteOne({ _id: futsalId });
    const deletedBookings = await bookingModel.deleteMany({
      futsalId: futsalId,
    });
    const deletedVendor = await UserModel.deleteOne({ _id: userId });
    return res.status(201).json({ message: "Futsal deleted", deleteFutsal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editFutsal = async (req, res) => {
  try {
    const { futsalId } = req.params;
    const updatedData = req.body;

    const updatedFutsal = await futsalModel.findByIdAndUpdate(
      futsalId,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedFutsal) {
      return res.status(404).json({ message: "Futsal not found" });
    }
    res
      .status(200)
      .json({ message: "Futsal updated successfully", futsal: updatedFutsal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFutsalById = async (req, res) => {
  try {
    const { futsalId } = req.params;
    const futsal = await futsalModel.findOne({ _id: futsalId });
    if (!futsal) {
      return res.status(401).json({ message: "Futsal not found" });
    }
    res.status(200).json({ message: "Futsal retrieved sucessfully", futsal });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "INternal server error" });
  }
};

const getPendingFutsals = async (req, res) => {
  try {
    const user_role = req.userRole;
    if (user_role !== "ADMIN") {
      return res
        .status(401)
        .json({ message: "User unauthorized for the access" });
    }
    const futsals = await futsalModel.find({ isValid: false });
    res.json(futsals);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const validateFutsal = async (req, res) => {
  try {
    const { futsalId } = req.params;
    const user_role = req.userRole;
    if (user_role !== "ADMIN") {
      return res
        .status(401)
        .json({ message: "User unauthorized for the access" });
    }
    const futsal = await futsalModel.findOne({ _id: futsalId });
    if (!futsal) {
      return res.status(404).json({ error: "Futsal not found" });
    }
    const updatedFutsal = await futsalModel.findByIdAndUpdate(
      futsalId,
      { isValid: true },
      { new: true }
    );
    const vendor = futsal.vendorId;
    const user = await UserModel.findByIdAndUpdate(
      { _id: vendor },
      { role: "VENDOR" },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "Futsal updated successfully", updatedFutsal });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export {
  validateFutsal,
  getPendingFutsals,
  getAllFutsals,
  createFutsal,
  getVendorSpecificFutsal,
  editFutsal,
  upload,
  deleteFutsal,
  getFutsalById,
  editStatus,
};

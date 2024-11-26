import futsalModel from "../model/Futsal.js"

const createFutsal = async (req, res) => {
  try {
    const { futsalName, futsalAddress, futsalDescription } = req.body;
    const futsal = await futsalModel.create({
      futsal_name: `${futsalName}`,
      futsal_address: `${futsalAddress}`,
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

const deleteFutsal = async (req, res) => {
  try {
    const { futsalId } = req.params;
    if (!futsalId) {
      return res.status(400).json({ msg: "No such futsal" });
    }
    const deletedFutsal = await futsalModel.deleteOne({ _id: futsalId });
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



export { getAllFutsals, createFutsal, getParticularFutsal , deleteFutsal, editFutsal};

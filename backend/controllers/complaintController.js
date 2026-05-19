const Complaint = require("../models/Complaint");

exports.addComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json({
      success: true,
      message: "Complaint Added",
      complaint
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();

    res.json(complaints);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateComplaint = async (req, res) => {
  try {

    const updatedComplaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedComplaint);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.searchComplaint = async (req, res) => {
  try {

    const complaints = await Complaint.find({
      location: req.query.location
    });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
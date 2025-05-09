// backend/controllers/barangController.js
const Barang = require("../models/Barang");

// Create a new barang
exports.createBarang = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBarang = new Barang({ title, content });
    const savedBarang = await newBarang.save();
    res.status(201).json(savedBarang);
  } catch (error) {
    res.status(500).json({ message: "Error creating barang", error });
  }
};

// Get all barang
exports.getBarangs = async (req, res) => {
  try {
    const barang = await Barang.find().sort({ createdAt: -1 });
    res.status(200).json(barang);
  } catch (error) {
    res.status(500).json({ message: "Error fetching barang", error });
  }
};

// Update a barang
exports.updateBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedBarang = await Barang.findByIdAndUpdate(id, { title, content }, { new: true });
    res.status(200).json(updatedBarang);
  } catch (error) {
    res.status(500).json({ message: "Error updating barang", error });
  }
};

// Delete a barang
exports.deleteBarang = async (req, res) => {
  try {
    const { id } = req.params;
    await Barang.findByIdAndDelete(id);
    res.status(200).json({ message: "Barang deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting barang", error });
  }
};
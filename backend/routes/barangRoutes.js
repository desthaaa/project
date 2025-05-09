// backend/routes/barangRoutes.js
const express = require("express");
const router = express.Router();
const { createBarang, getBarangs, updateBarang, deleteBarang } = require("../controllers/barangController");

// Route untuk membuat barang baru
router.post("/", createBarang);

// Route untuk mendapatkan semua barang
router.get("/", getBarangs);

// Route untuk memperbarui barang
router.put("/:id", updateBarang);

// Route untuk menghapus barang
router.delete("/:id", deleteBarang);

module.exports = router;
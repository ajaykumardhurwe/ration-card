const express = require("express");

const router = express.Router();

const {
    createRationCard,
    getAllRationCards,
    getRationCardById,
    updateRationCard,
    deleteRationCard
} = require("../controllers/rationCardController");


// CREATE
router.post("/", createRationCard);

// READ ALL
router.get("/", getAllRationCards);

// READ ONE
router.get("/:id", getRationCardById);

// UPDATE
router.put("/:id", updateRationCard);

// DELETE
router.delete("/:id", deleteRationCard);


module.exports = router;
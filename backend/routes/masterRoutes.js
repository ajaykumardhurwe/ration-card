const express = require("express");

const router = express.Router();

const {
    getDistricts,
    getBlocksByDistrict,
    getGramPanchayatsByBlock
} = require("../controllers/masterController");


// GET ALL DISTRICTS
router.get("/districts", getDistricts);


// GET BLOCKS BY DISTRICT
router.get("/districts/:districtId/blocks", getBlocksByDistrict);


// GET GRAM PANCHAYATS BY BLOCK
router.get("/blocks/:blockId/gram-panchayats", getGramPanchayatsByBlock);


module.exports = router;
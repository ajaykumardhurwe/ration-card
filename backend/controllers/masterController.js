const db = require("../config/db");


// GET ALL DISTRICTS
const getDistricts = async (req, res) => {
    try {

        const [rows] = await db.execute(`
            SELECT
                id,
                district_name,
                is_active,
                created_at
            FROM districts
            WHERE is_active = TRUE
            ORDER BY district_name ASC
        `);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// GET BLOCKS BY DISTRICT
const getBlocksByDistrict = async (req, res) => {
    try {

        const { districtId } = req.params;

        const [rows] = await db.execute(`
            SELECT
                id,
                district_id,
                block_name,
                is_active,
                created_at
            FROM blocks
            WHERE district_id = ?
            AND is_active = TRUE
            ORDER BY block_name ASC
        `, [districtId]);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// GET GRAM PANCHAYATS BY BLOCK
const getGramPanchayatsByBlock = async (req, res) => {
    try {

        const { blockId } = req.params;

        const [rows] = await db.execute(`
            SELECT
                id,
                block_id,
                gram_panchayat_name,
                is_active,
                created_at
            FROM gram_panchayats
            WHERE block_id = ?
            AND is_active = TRUE
            ORDER BY gram_panchayat_name ASC
        `, [blockId]);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    getDistricts,
    getBlocksByDistrict,
    getGramPanchayatsByBlock
};
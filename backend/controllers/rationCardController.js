const db = require("../config/db");

// CREATE
const createRationCard = async (req, res) => {
    try {
        const {
            district,
            block,
            gram_panchayat,
            ration_card_name,
            date_of_birth,
            gender,
            mobile_number,
            email_id,
            total_members
        } = req.body;

        if (
            !district ||
            !block ||
            !gram_panchayat ||
            !ration_card_name ||
            !date_of_birth ||
            !gender ||
            !mobile_number ||
            !total_members
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const sql = `
            INSERT INTO ration_card_members
            (
                district,
                block,
                gram_panchayat,
                ration_card_name,
                date_of_birth,
                gender,
                mobile_number,
                email_id,
                total_members
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            district,
            block,
            gram_panchayat,
            ration_card_name,
            date_of_birth,
            gender,
            mobile_number,
            email_id || null,
            total_members
        ];

        const [result] = await db.execute(sql, values);

        res.status(201).json({
            success: true,
            message: "Ration card member inserted successfully",
            data: {
                id: result.insertId
            }
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


// READ ALL
const getAllRationCards = async (req, res) => {
    try {

        const [rows] = await db.execute(`
            SELECT *
            FROM ration_card_members
            ORDER BY id DESC
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


// READ ONE
const getRationCardById = async (req, res) => {
    try {

        const { id } = req.params;

        const [rows] = await db.execute(
            `SELECT * FROM ration_card_members WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }

        res.status(200).json({
            success: true,
            data: rows[0]
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


// UPDATE
const updateRationCard = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            district,
            block,
            gram_panchayat,
            ration_card_name,
            date_of_birth,
            gender,
            mobile_number,
            email_id,
            total_members
        } = req.body;

        const sql = `
            UPDATE ration_card_members
            SET
                district = ?,
                block = ?,
                gram_panchayat = ?,
                ration_card_name = ?,
                date_of_birth = ?,
                gender = ?,
                mobile_number = ?,
                email_id = ?,
                total_members = ?
            WHERE id = ?
        `;

        const values = [
            district,
            block,
            gram_panchayat,
            ration_card_name,
            date_of_birth,
            gender,
            mobile_number,
            email_id || null,
            total_members,
            id
        ];

        const [result] = await db.execute(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Record updated successfully"
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


// DELETE
const deleteRationCard = async (req, res) => {
    try {

        const { id } = req.params;

        const [result] = await db.execute(
            `DELETE FROM ration_card_members WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Record deleted successfully"
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
    createRationCard,
    getAllRationCards,
    getRationCardById,
    updateRationCard,
    deleteRationCard
};
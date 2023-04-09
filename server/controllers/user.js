import { db } from "../db.js";

export const getUsers = (req, res) => {
    const q = "SELECT * FROM users"
        
    db.query(q, [req], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
};
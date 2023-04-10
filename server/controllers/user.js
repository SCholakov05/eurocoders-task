import { db } from "../db.js";

export const getUsers = (req, res) => {
    const q = "SELECT * FROM users"
        
    db.query(q, [req], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
};

export const deleteUser = (req, res) => {
    
        const q = 'DELETE FROM users WHERE `id` = ?';

        db.query(q, [req.params.id, ], (err, data) => {
            if (err) return res.status(403).json('Only the admin can delete users!');

            return res.json('User has been deleted!');
        })
};
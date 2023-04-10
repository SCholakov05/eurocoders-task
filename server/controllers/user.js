import { db } from "../db.js";

// Get all users
export const getUsers = (req, res) => {
    // SQL query to get all users from the database
    const q = "SELECT * FROM users"

    // Execute the SQL query to retrieve all users
    db.query(q, [req], (err, data) => {
        if (err) return res.status(500).send(err);

        // Send the retrieved data as a JSON response
        return res.status(200).json(data);
    });
};

// Delete a user
export const deleteUser = (req, res) => {

    // SQL query to delete a user from the database using their id
    const q = 'DELETE FROM users WHERE `id` = ?';

    // Execute the SQL query to delete the user
    db.query(q, [req.params.id,], (err, data) => {
        if (err) return res.status(403).json('Only the admin can delete users!');

        // Send a success message as a JSON response
        return res.json('User has been deleted!');
    })
};
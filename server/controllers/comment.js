import { db } from "../db.js";

// Retrieve all comments
export const getComments = (req, res) => {
    const q = "SELECT * FROM comments"

    db.query(q, [req], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
};

// Add a comment
export const addComment = (req, res) => {
    // Define query and values to insert a new comment into database
    const q = 'INSERT INTO comments(`comment`, `date`, `pid`) VALUES (?)';

    const values = [
        req.body.comment,
        req.body.date,
        req.body.pid
    ]

    // Execute query and return success message or error
    db.query(q, [values], (err, data) => {
        if (err) return console.log(err);;

        return res.json('Comment has been created successfully!');
    })
};

// Delete a comment
export const deleteComment = (req, res) => {

    const commentId = req.params.id;
    // Define query to delete comment if it belongs to the user
    const q = 'DELETE FROM comments WHERE `id` = ? AND `uid` = ?';

    // Execute query and return success message or error
    db.query(q, [commentId, req.params.pid], (err, data) => {
        if (err) return res.status(403).json('You can not delete others comments!');

        return res.json('Comment has been deleted!');
    })
};

import { db } from "../db.js";

export const getComments = (req, res) => {
    const q = "SELECT * FROM comments"
        
    db.query(q, [req], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
};

export const addComment = (req, res) => {
        const q = 'INSERT INTO comments(`comment`, `date`, `pid`) VALUES (?)';
    
        const values = [
            req.body.comment,
            req.body.date,
            req.body.pid
        ]

        db.query(q, [values], (err, data) => {
            if (err) return console.log(err);;
            
            return res.json('Comment has been created successfully!');
        })
};

export const deleteComment = (req, res) => {
   
        const commentId = req.params.id;
        const q = 'DELETE FROM comments WHERE `id` = ? AND `uid` = ?';

        db.query(q, [commentId, req.params.pid], (err, data) => {
            if (err) return res.status(403).json('You can not delete others comments!');

            return res.json('Comment has been deleted!');
        })
};

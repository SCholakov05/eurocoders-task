import { db } from "../db.js";

export const addEmail = (req, res) => {
    // SQL query to insert an email into the database
    const q = 'INSERT INTO emails(`from`, `to`, `message`) VALUES (?)';

    // Extract values from the request body
    const values = [
        req.body.from,
        req.body.to,
        req.body.message
    ]

    // Execute the SQL query to insert the email
    db.query(q, [values], (err, data) => {
        if (err) return console.log(err);;

        return res.json('Email has been sended successfully!');
    })
};

import { db } from "../db.js";

export const addEmail = (req, res) => {
        const q = 'INSERT INTO emails(`from`, `to`, `message`) VALUES (?)';
    
        const values = [
            req.body.from,
            req.body.to,
            req.body.message
        ]

        db.query(q, [values], (err, data) => {
            if (err) return console.log(err);;
            
            return res.json('Email has been sended successfully!');
        })
};

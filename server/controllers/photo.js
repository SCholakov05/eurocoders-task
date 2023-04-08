import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPhotos = (req, res) => {
    const q = req.query.cat
        ? "SELECT * FROM photos WHERE cat=?"
        : "SELECT * FROM photos";

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
};

export const getPhoto = (req, res) => {
    const q = "SELECT p.id , `username`, `title`, p.img ,`cat`,`date` FROM users u JOIN photos p ON u.id = p.uid WHERE p.id = ? ";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    });
};

export const addPhoto = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is invalid!');
        
        const q = 'INSERT INTO photos(`title`, `img`, `cat`, `date`, `uid`) VALUES (?)';
    
        const values = [
            req.body.title,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if (err) return console.log(err);;
            
            return res.json('Photo has been created successfully!');
        })
    });

};

export const deletePhoto = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json('Not authenticated');

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is invalid!');

        const photoId = req.params.id;
        const q = 'DELETE FROM photos WHERE `id` = ? AND `uid` = ?';

        db.query(q, [photoId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json('You can not delete others photos!');

            return res.json('Photo has been deleted!');
        })
    })
};

export const updatePhoto = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json('Not authenticated');

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is invalid!');
    

    const postId = req.params.id
    const q = 'UPDATE photos SET `title`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid` = ?';

    const values = [
        req.body.title,
        req.body.img,
        req.body.cat,
    ]

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json('Photo has been updated successfully!');
    });
});
};
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
    const q =
        "SELECT `username`, `title`, p.img ,`cat`,`date` FROM users u JOIN photos p ON u.id = p.uid WHERE p.id = ? ";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

export const addPhoto = (req, res) => {
    res.json('from controller');

};

export const deletePhoto = (req, res) => {
    res.json('from controller');

};

export const updatePhoto = (req, res) => {
    res.json('from controller');

};
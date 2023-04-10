import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import './AdminHome.scss';
import AdminNavbar from "../../components/navbar/AdminNavbar";

const AdminHome = () => {
    const [photos, setPhotos] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resPhotos = await axios.get('/photos');
                const lastFivePhotos = resPhotos.data.slice(-5).sort((a, b) => new Date(b.date) - new Date(a.date));
                const resUsers = await axios.get('/users');
                const lastFiveUsers = resUsers.data.slice(-5).sort((a, b) => new Date(b.date) - new Date(a.date));
                setPhotos(lastFivePhotos);
                setUsers(lastFiveUsers);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
console.log(users);
    return (
        <>
            <AdminNavbar />
            <div className="home">
                <h2>Last 5 photos:</h2>
                <div className="photos">
                    {photos.map((photo) => (
                        <div className="photo" key={photo.id}>
                            <div className="img">
                                    <img src={`./upload/${photo.img}`} alt={`${photo.title} photo`} />
                            </div>
                            <div className="content">
                                <h1>{`Title: ${photo.title}`}</h1>
                                <p>{`Category: ${photo.cat}`}</p>
                                <p>Photo posted {moment(photo.date).fromNow()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <h2>Last 5 users:</h2>
                <div className="users">
                    {users.map((user) => (
                        <div className="user" key={user.id}>
                                <h1>{`User: ${user.username}`}</h1>
                                <p>User created {moment(user.date).fromNow()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminHome;
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import './AdminHome.scss';
import AdminNavbar from "../../components/navbar/AdminNavbar";

const AdminHome = () => {
    const [photos, setPhotos] = useState([]); // creating a state variable for photos using the useState hook
    const [users, setUsers] = useState([]); // creating a state variable for users using the useState hook

    useEffect(() => { // using the useEffect hook to fetch data on component mount

        const fetchData = async () => { // defining an async function to fetch data
            try {
                const resPhotos = await axios.get('/photos'); // fetching photos data from the backend
                const lastFivePhotos = resPhotos.data.slice(-5).sort((a, b) => new Date(b.date) - new Date(a.date)); // selecting the last 5 photos and sorting them by date
                const resUsers = await axios.get('/users'); // fetching users data from the backend
                const lastFiveUsers = resUsers.data.slice(-5).sort((a, b) => new Date(b.date) - new Date(a.date)); // selecting the last 5 users and sorting them by date
                setPhotos(lastFivePhotos); // setting the photos state variable with the fetched data
                setUsers(lastFiveUsers); // setting the users state variable with the fetched data
            } catch (err) {
                console.log(err); // logging any errors to the console
            }
        };
        fetchData(); // calling the fetchData function
    }, []); // empty dependency array to ensure the useEffect hook only runs once on mount

    return (
        <>
            <AdminNavbar />
            <div className="home">
                <h2>Last 5 photos:</h2>
                <div className="photos">
                    {photos.map((photo) => ( // Mapping over the photos array to display each photo
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
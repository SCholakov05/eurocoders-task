import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import './Home.scss';
import AdminNavbar from "../../components/navbar/AdminNavbar";

const AdminHome = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/photos');
                const lastTenPhotos = res.data.slice(-10).sort((a, b) => new Date(b.date) - new Date(a.date));
                setPhotos(lastTenPhotos);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="home">
                <h2>Last 10 photos:</h2>
                <div className="photos">
                    {photos.map((photo) => (
                        <div className="photo" key={photo.id}>
                            <div className="img">
                                <Link to={`/photo/${photo.id}`}>
                                    <img src={`./upload/${photo.img}`} alt={`${photo.title} photo`} />
                                </Link>
                            </div>
                            <div className="content">
                                <h1>{`Title: ${photo.title}`}</h1>
                                <p>{`Category: ${photo.cat}`}</p>
                                <p>Photo posted {moment(photo.date).fromNow()}</p>
                            </div>
                        </div>
                    )
                    )
                    }
                </div>
            </div>
        </>
    );
};

export default AdminHome;
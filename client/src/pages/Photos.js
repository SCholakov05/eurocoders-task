import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Photos = () => {
    const [photos, setPhotos] = useState([]);

    const cat = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/photos${cat}`);
                setPhotos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);

    return (
        <>
            <div className="links">
                <p>CATEGORY:</p>
                <Link className="link" to="/photos/?cat=sport">
                    <h6>SPORT</h6>
                </Link>
                <Link className="link" to="/photos/?cat=art">
                    <h6>ART</h6>
                </Link>
                <Link className="link" to="/photos/?cat=technology">
                    <h6>TECHNOLOGY</h6>
                </Link>
                <Link className="link" to="/photos/?cat=cinema">
                    <h6>CINEMA</h6>
                </Link>
                <Link className="link" to="/photos/?cat=food">
                    <h6>FOOD</h6>
                </Link>
            </div>
            <div className="home">
                <div className="photos">
                    {photos.map((photo) => (
                        <div className="photo" key={photo.id}>
                            {
                                console.log(photo.id)
                            }
                            <div className="img">
                                <Link to={`/photos/${cat}/${photo.id}`}>
                                    <img src={photo.img} alt={`${photo.title} photo`} />
                                </Link>
                            </div>
                            <div className="content">
                                    <h1>{photo.title}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Photos;
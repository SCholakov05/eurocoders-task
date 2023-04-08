import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/photos');
        setPhotos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="photos">
        {photos.map((photo) => (
          <div className="photo" key={photo.id}>
            <div className="img">
              <Link to={`/photo/${photo.id}`}>
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
  );
};

export default Home;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  console.log(photos);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/photos');
        const lastTenPhotos = res.data.slice(-10);
        setPhotos(lastTenPhotos);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="photos">
        {photos.map((photo, index) => (
          <div className="photo" key={photo.id}>
            <div className="img">
              <Link to={`/photo/${photo.id}`}>
                <img src={`./upload/${photo.img}`} alt={`${photo.title} photo`} />
              </Link>
            </div>
            <div className="content">
              <h1>{photo.title}</h1>
              <p>Photo posted {moment(photo.date).fromNow()}</p>
            </div>
          </div>
        )
        )
        }
      </div>
    </div>
  );
};

export default Home;

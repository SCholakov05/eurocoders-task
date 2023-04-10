import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import './Home.scss';

const Home = () => {
  const [photos, setPhotos] = useState([]); // Initializing photos state as an empty array

  useEffect(() => { // Using useEffect hook to fetch data from server when component is mounted
    const fetchData = async () => {
      try {
        const res = await axios.get('/photos'); // Making a GET request to server to fetch all photos
        const lastTenPhotos = res.data.slice(-10).sort((a, b) => new Date(b.date) - new Date(a.date)); // Extracting the last 10 photos and sorting them by date
        setPhotos(lastTenPhotos); // Updating the photos state with the last 10 photos
      } catch (err) {
        console.log(err); // Handling errors
      }
    };
    fetchData(); // Calling the fetchData function to fetch data from server
  }, []);
  
  return (
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
  );
};

export default Home;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Single = () => {

    const [photo, setPhoto] = useState();

    const location = useLocation();
    const postId = location.pathname.split('/')[2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/photos/${postId}`);
                setPhoto(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId]);

  return (
    <div className="single">
    <div className="content">
      <img src={photo?.img} alt="" />
      <div className="user">
        {/* {photo.userImg && 
        <img
          src={photo.userImg}
          alt=""
        />} */}
        <div className="info">
          <span>{photo.username}</span>
          <p>Posted {moment(photo.date).fromNow()}</p>
        </div>
        {currentUser.username === photo.username && (
          <div className="edit">
            <Link to={`/write?edit=2`} state={photo}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
        )}
      </div>
      <h1>{photo.title}</h1>
      </div>
  </div>
  )
}

export default Single

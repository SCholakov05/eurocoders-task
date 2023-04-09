import React, { useEffect, useState } from "react";
import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import './Single.scss';

const Single = () => {
  const [photo, setPhoto] = useState({});
  const [comments, setComments] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const photoId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPhoto = await axios.get(`/photos/${photoId}`);
        setPhoto(resPhoto.data);
        const resCmnt = await axios.get(`/comments`);
        setComments(resCmnt.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [photoId]);

  console.log(comments);

  const handleDelete = async () => {
    try {
      await axios.delete(`/photos/${photoId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${photo?.img}`} alt="" />
        <div className="user">
          <div className="info">
          <div className="add-cmnt">
            <label htmlFor="cmnt">Add a comment:</label>
            <textarea name="cmnt" id="cmnt" cols="30" rows="10"></textarea>
            <button>Add</button>
          </div>
            <h2>{`Title: ${photo.title}`}</h2>
            <span>{`Username: ${photo.username}`}</span>
            <p>Photo posted {moment(photo.date).fromNow()}</p>
          </div>
          {currentUser.username === photo.username && (
            <div >
              <Link to={`/publish?edit=2`} state={photo}>
                <button className="edit">EDIT</button>
              </Link>
              <button className="delete" onClick={handleDelete}>DELETE</button>
            </div>
          )}
        </div>
        <div className="comments">
          {comments.map((cmnt) =>
            cmnt.pid === photo.id && (
              <div >
                {cmnt.comment}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Single;

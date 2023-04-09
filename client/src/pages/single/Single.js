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
  const [comment, setComment] = useState('');

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
  }, [photoId, comments]);

  const handleDeletePhoto = async () => {
    try {
      await axios.delete(`/photos/${photoId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickCmnt = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/comments`, {
        comment, date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), pid: photoId
      });
    } catch (err) {
      console.log(err);
    }
    setComment('');
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${photo?.img}`} />
        <div className="user">
          <div className="info">
            <div className="add-cmnt">
              <label htmlFor="cmnt">Add a comment:</label>
              <textarea id="cmnt" cols="30" rows="10" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
              <button onClick={handleClickCmnt}>Add</button>
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
              <button className="delete" onClick={handleDeletePhoto}>DELETE</button>
            </div>
          )}
        </div>
        <div className="comments">
          {comments.map((cmnt) =>
            cmnt.pid === photo.id && (
              <div key={cmnt.id}>
                <div className="indCmnt">
                  <p>{cmnt.comment}</p>
                  <p>Comment posted {moment(comment.date).fromNow()}</p>
                </div>
              </div>
            ))}
            </div>
      </div>
    </div>
  );
};

export default Single;

import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
    const [photo, setPhoto] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const photoId = location.pathname.split("/")[2];

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/photos/${photoId}`);
                setPhoto(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [photoId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/photos/${photoId}`);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="single">
            <div className="content">
                <img src={photo?.img} alt="" />
                <div className="user">
                    <div className="info">
                        <span>{photo.username}</span>
                        <p>Photo posted {moment(photo.date).fromNow()}</p>
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
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(photo.desc),
                    }}
                ></p>
            </div>
        </div>
    );
};

export default Single;

import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const PublishPhoto = () => {

    const state = useLocation().state;
    const [value, setValue] = useState(state?.title || "");
    const [title, setTitle] = useState(state?.desc || "");
    const [img, setImg] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");

    const navigate = useNavigate();

    const handleClick = async (e) => {

    }

    return (
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name=""
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label className="file" htmlFor="file">
                        Upload Image
                    </label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                    </div>
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "sport"}
                            name="cat"
                            value="sport"
                            id="sport"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="sport">Sport</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "art"}
                            name="cat"
                            value="art"
                            id="art"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "technology"}
                            name="cat"
                            value="technology"
                            id="technology"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "cinema"}
                            name="cat"
                            value="cinema"
                            id="cinema"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "food"}
                            name="cat"
                            value="food"
                            id="food"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="food">Food</label>
                    </div>
                    <button onClick={handleClick}>Publish</button>
                </div>
            </div>
        </div>
    )
}

export default PublishPhoto

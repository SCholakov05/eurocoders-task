import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import './PublishPhoto.scss';

const PublishPhoto = () => {

    // Retrieve the state from the location object
    const state = useLocation().state;

    // Define the states using the useState hook
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");
    const [error, setError] = useState('');

    // Retrieve the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Define the upload function to upload the image file to the server
    const upload = async () => {
        try {
            const formData = new FormData(); // Create a new form data object
            formData.append('file', file); // Append the image file to the form data object
            const res = await axios.post('/upload', formData); // Send the form data object to the server to upload the image
            return res.data; // Return the image URL
        } catch (err) {
            console.log(err);
        };
    };

     // Define the handleClick function to handle the click event on the Publish button
    const handleClick = async (e) => {
        e.preventDefault();

        // Check if all the required fields are filled
        if(title !== '' && file !== null && cat !== '') {
            const imgUrl = await upload(); // Upload the image file to the server and retrieve the image URL
            try {
                 // If the state exists, update the existing photo with the new values
                // Otherwise, create a new photo with the given values
                state ? await axios.put(`/photos/${state.id}`, {
                    title, cat, img: imgUrl
                }) : await axios.post(`/photos/`, {
                    title, cat, img: imgUrl, date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                });
                navigate('/');  // Navigate to the home page
            } catch (err) {
                console.log(err);
            }
        } else {
            setError('All fields are mandatory!') // Set the error message if any of the required fields are empty
        }
    };
    return (
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    required
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <input
                        style={{ display: "none" }}
                        required
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label className="file" htmlFor="file">
                        Upload Image
                    </label>
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            required
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
                    {
                        error && <p>{error}</p>
                    }
                    <button onClick={handleClick} className="publish">Publish</button>
                </div>
            </div>
        </div>
    )
}

export default PublishPhoto

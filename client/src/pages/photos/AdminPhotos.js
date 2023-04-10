import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import './AdminPhotos.scss';
import AdminNavbar from "../../components/navbar/AdminNavbar";

const AdminPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const photosPerPage = 10;

    const cat = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/photos/${cat}`);
                const sortedPhotos = res.data.sort((a, b) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return dateB - dateA; // sort in descending order
                });
                setPhotos(sortedPhotos);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);

    // Get current photos
    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <AdminNavbar />
            <div className="photosPage">
                <p>CATEGORY:</p>
                <div className="category">
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
                <div className="photos">
                    {currentPhotos.map((photo) => (
                        <div className="photo" key={photo.id}>
                            <div className="img">
                                <Link to={`/photo/${photo.id}`}>
                                    <img
                                        src={`../upload/${photo.img}`}
                                        alt={`${photo.title} photo`}
                                    />
                                </Link>
                            </div>
                            <div className="content">
                                <h1>{photo.title}</h1>
                                <p>{`Category: ${photo.cat}`}</p>
                                <Link to={`/photo/${photo.id}`}>
                                    <p>See comments</p>
                                </Link>
                                <p>Photo posted {moment(photo.date).fromNow()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {photos.length > photosPerPage &&
                        Array.from({ length: Math.ceil(photos.length / photosPerPage) }).map(
                            (_, index) => (
                                <button
                                    key={index}
                                    className={`page-btn ${currentPage === index + 1 ? "active" : ""
                                        }`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                </div>
            </div>
        </>
    );
};

export default AdminPhotos;
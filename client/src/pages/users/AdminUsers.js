import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import './Users.scss';
import AdminNavbar from "../../components/navbar/AdminNavbar";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/users');
                const sortedUsers = res.data.sort((a, b) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return dateB - dateA; // sort in descending order
                });
                setUsers(sortedUsers);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleDeleteUser = async (user) => {
        try {
          await axios.delete(`/users/${user.id}`);
          setUsers(users.filter((u) => u.id !== user.id)); // remove the deleted user from the state
        } catch (err) {
          console.log(err);
        }
      };

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <AdminNavbar />
            <div className="users">
                <h1>Users:</h1>
                {currentUsers.map((user) => (
                    <div className="user" key={user.id}>
                        <p>User: {user.username}</p>
                        <p>Registered {moment(user.date).fromNow()}</p>
                        <button onClick={() => handleDeleteUser(user)}>DELETE</button>
                    </div>
                ))}
                 <div className="pagination">
        {users.length > usersPerPage &&
          Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
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

export default AdminUsers;

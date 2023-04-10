import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import './Users.scss';
import AdminNavbar from "../../components/navbar/AdminNavbar";

const AdminUsers = () => {

  // Define states for users, current page, and number of users per page
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  // Fetch user data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/users'); // GET request to API to retrieve user data
        const sortedUsers = res.data.sort((a, b) => {
          const dateA = new Date(a.date).getTime(); // Get timestamp of date of user a
          const dateB = new Date(b.date).getTime(); // Get timestamp of date of user b
          return dateB - dateA; // sort users in descending order based on registration date
        });
        setUsers(sortedUsers); // update state with sorted users
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Define function to handle user deletion
  const handleDeleteUser = async (user) => {
    try {
      await axios.delete(`/users/${user.id}`);// DELETE request to API to delete specified user
      setUsers(users.filter((u) => u.id !== user.id)); // remove the deleted user from the state
    } catch (err) {
      console.log(err);
    }
  };

  // Get current users based on current page and number of users per page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Define function to handle page change
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

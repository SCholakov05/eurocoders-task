import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import './Users.scss';

const Users = () => {

  //Declaring state variables
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  useEffect(() => {
    // use the useEffect hook to fetch the list of users from the server
    const fetchData = async () => {
      try {
        const res = await axios.get('/users'); // send a GET request to the '/users' endpoint
        const sortedUsers = res.data.sort((a, b) => {
          const dateA = new Date(a.date).getTime(); // convert the date string to a timestamp
          const dateB = new Date(b.date).getTime();
          return dateB - dateA; // sort the users by their registration date in descending order
        });
        setUsers(sortedUsers); // set the state variable for users to the sorted list of users
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);  // the empty array as the second argument ensures that the effect runs only once, when the component mounts

  // Get current users based on current page and number of users per page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Define function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="users">
        <h1>Users:</h1>
        {currentUsers.map((user) => (
          <div className="user" key={user.id}>
            <p>User: {user.username}</p>
            <p>Registered {moment(user.date).fromNow()}</p>
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

export default Users;
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/users');
                console.log(res.data);
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="home">
            <div className="photos">
                {users.map((user, index) => (
                    <div className="user" key={user.id}>
                        <div className="content">
                            <h1>{user.username}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;

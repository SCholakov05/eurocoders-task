import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeBtn from "./HomeBtn";
import moment from "moment";
import './LoginRegister.scss';

const Register = () => {
  // Define a state variable called 'inputs' and initialize it with an object containing the values for username, email, password and date
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  });
  
  // Define a state variable called 'err' and initialize it with null
  const [err, setError] = useState(null);

  // Define a variable called 'navigate' using the 'useNavigate' hook from 'react-router-dom'
  const navigate = useNavigate();

  // Define a function called 'handleChange' to handle changes to the input fields, and update the 'inputs' state variable accordingly
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  // Define a function called 'handleSubmit' to handle the form submission, and perform the registration operation using an API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.username !== '' && inputs.email !== '' && inputs.password !== '') {
      try {
        await axios.post("/auth/register", inputs);
        navigate("/login");
      } catch (err) {
        setError(err.response.data);
      }
    } else {
      setError('All fields are mandatory');
    }
  };

  return (
    <>
      <HomeBtn />
      <div className="auth">
        <h1>Register</h1>
        <form>
          <input
            required
            type="text"
            placeholder="Username..."
            name="username"
            onChange={handleChange}
          />
          <input
            required
            type="email"
            placeholder="Email..."
            name="email"
            onChange={handleChange}
          />
          <input
            required
            type="password"
            placeholder="Password..."
            name="password"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Register</button>
          {err && <p>{err}</p>}
          <span>
            You already an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Register;

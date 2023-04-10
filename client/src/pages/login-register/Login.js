import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import HomeBtn from "./HomeBtn";
import './LoginRegister.scss';

const Login = () => {
    // creating state for input values
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    // Getting navigate function from useNavigate hook
    const navigate = useNavigate();

    // Getting login function from AuthContext using useContext hook
    const { login } = useContext(AuthContext);

    // Function to handle input change
    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    // Function to handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Checking if all fields are filled
        if (inputs.username !== '' && inputs.email !== '' && inputs.password !== '') {
            try {
                // Calling login function with input values
                await login(inputs);
                // Navigating to home page on successful login
                navigate('/');
            } catch (err) {
                // Setting error message if login fails
                setError(err.response.data);
            }
        } else {
            // Setting error message if any field is empty
            setError('All fields are mandatory');
        }
    }

    // Rendering login form
    return (
        <>
            <HomeBtn />
            <div className='auth'>
                <h1>LOGIN</h1>
                <form>
                    <input required type="text" placeholder='Username...' name="username" onChange={handleChange} />
                    <input required type="password" placeholder='Password...' name="password" onChange={handleChange} />
                    <button onClick={handleSubmit}>LOGIN</button>
                    {
                        error && <p>{error}</p> // show error message if there's an error
                    }
                    <span>Not registered yet? <Link to='/register'>Register</Link></span>
                </form>
                {/* Link to admin login page */}
                <Link to='/admin-login'><button className="admin">ADMIN</button></Link>
            </div>
        </>
    )
}

export default Login
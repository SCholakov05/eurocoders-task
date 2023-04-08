import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate('/');
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <div className='auth'>
            <h1>LOGIN</h1>
            <form>
                <input required type="text" placeholder='Username...' name="username" onChange={handleChange} />
                <input required type="password" placeholder='Password...' name="password" onChange={handleChange} />
                <button onClick={handleSubmit}>LOGIN</button>
                {
                    error && <p>{error}</p>
                }
                <span>Not registered yet? <Link to='/register'>Register</Link></span>
            </form>
        </div>
    )
}

export default Login
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminLogin.scss';

const AdminLogin = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(inputs.username === 'admin' && inputs.password === 'admin') {
            navigate('/admin-home');
        } else if(inputs.username === '' && inputs.password === '') {
            setError('All fields are mandatory!');
        }
         else {
            setError('Incorrect admin username or password!');
        }
    }

    return (
        <>
            <Link to="/login">
                <button className="homeBtn">BACK</button>
            </Link>
            <div className='auth'>
                <h1>ADMIN LOGIN</h1>
                <form>
                    <input required type="text" placeholder='Username...' name="username" onChange={handleChange} />
                    <input required type="password" placeholder='Password...' name="password" onChange={handleChange} />
                    <button className="loginAdmin" onClick={handleSubmit}>LOGIN</button>
                    {
                        error && <p>{error}</p>
                    }
                </form>
            </div>
        </>
    )
}

export default AdminLogin
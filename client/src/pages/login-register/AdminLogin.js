import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminLogin.scss';

const AdminLogin = () => {  
    // creating state for input values
    const [inputs, setInputs] = useState({  
        username: '',
        password: '',
    });

     // creating state for error messages
    const [error, setError] = useState(null); 

    // using useNavigate hook for routing
    const navigate = useNavigate();  

    // function to update input values on change
    const handleChange = (e) => {  
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();  

        // check if the admin username and password are correct
        if (inputs.username === 'admin' && inputs.password === 'admin') {
            navigate('/admin-home');  // navigate to the admin home page
        } else if (inputs.username === '' && inputs.password === '') {
            setError('All fields are mandatory!');  // show error message if fields are empty
        } else {
            setError('Incorrect admin username or password!');  // show error message if admin credentials are incorrect
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
                        error && <p>{error}</p>  // show error message if there's an error
                    }
                </form>
            </div>
        </>
    )
}

export default AdminLogin
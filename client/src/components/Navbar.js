import { Link } from "react-router-dom";
import Logo from '../img/logo.png';
import '../Style.scss'

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="container">
        <Link to='/'>
          <img className='logo' src={Logo} alt="logo" />
        </Link>
        <div className="links">
          <Link className='link' to='/photos'>
            <h6>PHOTOS</h6>
          </Link>
          <Link className='link' to='/users'>
            <h6>USERS</h6>
          </Link>
          <Link className='link' to='/contacts'>
            <h6>CONTACTS</h6>
          </Link>
          <Link className='link' to='/login'>
            <h6>LOGIN</h6>
          </Link>
          <Link className='link' to='/register'>
            <h6>REGISTER</h6>
          </Link>
          {/* <span>Simo</span>
            <span>Logout</span> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar

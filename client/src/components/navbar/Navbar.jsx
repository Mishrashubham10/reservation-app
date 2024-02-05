import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="navContainer">
            <span className="logo">
              <Link to="/">
                <p>shubhbooking</p>
              </Link>
            </span>
            <div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">Login</button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
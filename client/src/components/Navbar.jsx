import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logos/Logo.svg";
import UserContext from "../contexts/UserContext";

const Navbar = () => {
  const { displayUser } = useContext(UserContext);

  return (
    <div className=" bg-gray-900 text-white py-6">
      <div className="flex items-center justify-around">
        <div>
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div>
          <nav>
            <ul className="flex space-x-8 text-lg">
              {!displayUser ? (
                <>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>Hello {displayUser}</li>
                  <li>
                    <Link to="/write">Write Review</Link>
                  </li>
                  <li>
                    <Link to="/my-reviews">My Reviews</Link>
                  </li>
                  <li>
                    <Link to="/">Logout</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

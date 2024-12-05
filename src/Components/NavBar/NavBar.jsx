import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../store/slices/authSlice";
import logo1 from "../../img/logo1.png";
import { FiLogIn, FiLogOut, FiMenu } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((store) => store.authSlice.isLogged);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userTo = isLogged ? "/profile" : "/login";

  const logout = () => {
    dispatch(reset());
    navigate("/login");
  };

  const getClass = ({ isActive }) =>
    isActive ? "navbar__link--active" : "navbar__link";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav">
      <div className="logo_nav">
        <img src={logo1} alt="Logo" />
      </div>
      <div className={`navigation_items ${isMenuOpen ? "open" : ""}`}>
        <ul className="ul_links">
          <li>
            <NavLink to={"/"} className={getClass}>
              INICIO
            </NavLink>
          </li>
          <li>
            <NavLink to={"/contact"} className={getClass}>
              CONTACTO
            </NavLink>
          </li>
          <li>
            <NavLink to={"/about-us"} className={getClass}>
              ACERCA DE
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="login_nav">
        <div>
          {!isLogged ? (
            <button className="sign_interaction">
              <NavLink to={"/login"}>
                <FiLogIn />
              </NavLink>
            </button>
          ) : (
            <button className="sign_interaction" onClick={logout}>
              <FiLogOut />
            </button>
          )}
        </div>
        <div>
          <button className="profile_btn">
            <NavLink to={userTo}>
              <FaRegCircleUser />
            </NavLink>
          </button>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <FiMenu />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

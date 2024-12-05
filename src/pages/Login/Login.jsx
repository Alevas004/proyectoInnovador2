import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../Components/Login/LoginForm/LoginForm";
import "./Login.css";
import { startSessionThunk } from "../../store/slices/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const Login = () => {
  const isLogged = useSelector((store) => store.authSlice.isLogged);
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from;

  const handleLogin = async (loginData) => {
    dispatch(startSessionThunk(loginData));
  };

  return (
    <div className="login-container">
      <section className="login-section">
        <h3 className="login-title">Bienvenido(a)! <br/>
          <br/>Ingresa tu usuario y contraseña para ingresar</h3>
        
        <LoginForm onLogin={handleLogin} />
      </section>

      {isLogged && <Navigate to={from ?? "/"} />}
    </div>
  );
};

export default Login;

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //Esto nos sirve para ver la informacion almacenada en el redux, asi podremos comprobar si el usuario esta o no loggeado y poder hacer redireccionamientos. siempre se debe hacer con useSelector que viene de redux

  const isLogged = useSelector((store) => store.authSlice.isLogged);

  // useLocation es una funcion que tiene react-router-dom para poder saber en que url estaba el usuario
  const location = useLocation();

  // validacion con redirecionamiento en caso de no estar logeado.  <Navigate/> es el que redirecciona

  // en caso de que el usuario no este logeado lo mandamos al login, y en caso de que ya lo este entonces se renderizan los children "pages" de la app normalmente

  if (!isLogged)
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  else return <>{children}</>

};

export default ProtectedRoute;

import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/Login/Login";
import App from "../App";
import Enterprises from "../pages/Enterprises/Enterprises";
import ProtectedRoute from "../Components/common/ProtectedRoute/ProtectedRoute";
import Profile from "../pages/Profile/Profile";
import SignUp from "../pages/SignUp/SignUp";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/enterprises",
        element: (
          <ProtectedRoute>
            <Enterprises />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignUp/>
      }
    ],
  },
  {
    path: "*",
    element: <p>Page was not founded 404</p>,
  },
]);

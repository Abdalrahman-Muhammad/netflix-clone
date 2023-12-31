import { Route, Routes, Navigate } from "react-router-dom";
import "./app.scss";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Watch } from "./pages/watch/Watch";
import { useContext } from "react";
import { AuthContext } from "../src/authContext/AuthContext";
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/register" replace />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" replace />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
      />
      {user && (
        <>
          <Route path="/movies" element={<Home type="movie" />} />
          <Route path="/series" element={<Home type="series" />} />
          <Route path="/watch" element={<Watch />} />
        </>
      )}
    </Routes>
  );
};

export default App;

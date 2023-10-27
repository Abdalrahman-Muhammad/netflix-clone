import { Sidebar } from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import "./app.css";
import { Home } from "./pages/home/Home";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { UserList } from "./pages/userList/UserList";
import { User } from "./pages/user/User";
import { NewUser } from "./pages/newUser/NewUser";
import { MovieList } from "./pages/movieList/MovieList";
import { Movie } from "./pages/movie/Movie";
import { NewMovie } from "./pages/newMovie/NewMovie";
import { Login } from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import { ListList } from "./pages/listList/ListList";
import { List } from "./pages/list/List";
import { NewList } from "./pages/newList/NewList";

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);
  const routesToHideSidebarAndTopbar = ["/login"];
  const shouldHideSidebarAndTopbar = routesToHideSidebarAndTopbar.includes(
    location.pathname
  );
  return (
    <>
      {user && !shouldHideSidebarAndTopbar && <Topbar />}
      <div className="container">
        {user && !shouldHideSidebarAndTopbar && <Sidebar />}
        <Routes>
          <Route
            path="/login"
            exact
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          {user && (
            <>
              <Route path="/" exact element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movies/:movieId" element={<Movie />} />
              <Route path="/newMovie" element={<NewMovie />} />
              <Route path="/lists" element={<ListList />} />
              <Route path="/lists/:listId" element={<List />} />
              <Route path="/newList" element={<NewList />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;

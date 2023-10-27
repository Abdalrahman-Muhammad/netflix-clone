import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
import "./home.scss";
import { Navbar } from "../../components/navbar/Navbar.jsx";
import { Featured } from "../../components/featured/Featured.jsx";
import { List } from "../../components/list/List";

export const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer" +
                " " +
                JSON.parse(localStorage.getItem("user")).accessToke,
            },
          }
        );
        console.log(res.data);
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomList();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list, i) => (
        <List list={list} key={list._id} />
      ))}
    </div>
  );
};

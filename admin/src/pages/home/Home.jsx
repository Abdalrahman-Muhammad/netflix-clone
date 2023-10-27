import "./home.css";
import { FeaturedInfo } from "../../components/featuredInfo/FeaturedInfo";
import { Chart } from "../../components/chart/Chart";

import { WidgetSm } from "../../components/widgetSm/WidgetSm";
import { WidgetLg } from "../../components/widgetLg/WidgetLg";
import { useMemo, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";

export const Home = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [userStats, setUserStats] = useState([]);
  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/stats`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToke,
          },
        });
        const itemList = res.data.sort((a, b) => a._id - b._id);
        itemList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUserStats();
  }, [MONTHS]);
  console.log(userStats);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        props={{
          data: userStats,
          dataKey: "New User",
          grid: true,
          title: "User Analytics",
        }}
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

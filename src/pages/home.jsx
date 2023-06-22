import React from 'react';
import MapaFabrica from '../components/map';
import TableMain from '../components/tableMain.jsx';
import MyResponsiveBar from '../components/home/bar';
import MiniDrawer from '../components/sidebar.jsx';
import data from "../components/home/data.json";
import DbmPorSetorPorHora from "../components/home/chart";
import MyResponsivePie from '../components/home/pizza';
import Kpis from '../components/home/kpis/kpis';
import TableDashNotifications from "../components/tableDashNotifications";

const Home = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh"}}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
        <div style={{ width: "58%", height: "60%", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "50px" }}>
          <Kpis />
        </div>
        <div style={{ width: "30%", height: "300%", marginLeft: "100px", marginRight: "60px" }}>
          <TableDashNotifications updateHaveUnread={props.updateHaveUnread} />
          <div style={{ width: "110%" }}>
            <div style={{ height: "300px" }}>
              <MyResponsiveBar />
            </div>
            <div style={{ height: "260px" }}>
              <MyResponsivePie />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", height: "25vh", marginTop: "4%" }}>
        <div style={{ width: "60%", height: "100%", marginLeft: "2vw" }}>
          <DbmPorSetorPorHora />
        </div>
      </div>
      <div style={{ display: "flex", height: "calc(65vh - 3% - 25vh)", marginTop: "0.5%" }}>
        <div style={{ width: "60%", height: "100%", marginLeft: "2vw" }}>
          <MapaFabrica />
        </div>
        {/* <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
          <div style={{ height: "300px" }}>
            <MyResponsiveBar />
          </div>
          <div style={{ height: "200px" }}>
            <MyResponsivePie />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
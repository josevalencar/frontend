import React from 'react'
import MapaFabrica from '../components/map'
import TableMain from '../components/tableMain.jsx';
import MyResponsiveBar from '../components/home/bar';
import MiniDrawer from '../components/sidebar.jsx'
import data from "../components/home/data.json"
import DbmPorSetorPorHora from "../components/home/chart";
import MyResponsivePie from '../components/home/pizza';


const Home = () => {
  return (
    <div>
      <MapaFabrica />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "500px" }}>
        <MyResponsivePie/>
        <DbmPorSetorPorHora/>
        <MyResponsiveBar/>
      </div>
      <TableMain />
    </div>
  )
}

export default Home

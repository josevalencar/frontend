import React from 'react'
import MapaFabrica from '../components/map'
import TableMain from '../components/tableMain.jsx';
import MyResponsiveBar from '../components/home/bar';
import MiniDrawer from '../components/sidebar.jsx'
import data from "../components/home/data.json"


const Home = () => {
  return (
    <div>
      <MapaFabrica />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "500px" }}>
        <MyResponsiveBar data={data} />
      </div>
      <TableMain />
    </div>
  )
}

export default Home

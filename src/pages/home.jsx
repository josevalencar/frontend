import React from 'react'
import MapaFabrica from '../components/map'
import TableMain from '../components/tableMain.jsx';
import MyResponsiveBar from '../components/home/bar';
import MiniDrawer from '../components/sidebar.jsx'
import data from "../components/home/data.json"
import DbmPorSetorPorHora from "../components/home/chart";
import MyResponsivePie from '../components/home/pizza';
import Kpis from '../components/home/kpis/kpis';


const Home = () => {
  return (
    <div style={{style:"flex", flexDirection:"column"}}>
      <div style={{ width: "100vw", height: "10vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "90vw", height: "10vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Kpis/>
        </div>
      </div>
      <div style={{display:"flex", flexDirection:"row", width:"100vw", height:"25vh", marginTop:"3%"}}>
        <div style={{marginLeft:"2vw", width:"50vw", height:"25vh"}}>
          <DbmPorSetorPorHora/>
        </div>
        <div style={{width:"50vw", height:"25vh"}}>

        </div>
      </div>
      <div style={{marginLeft:"2vw", display:"flex", flexDirection:"row", width:"100vw", height:"25vh", marginTop:"1%"}}>
        <div style={{marginLeft:"2vw", width:"50vw"}}>
          <MapaFabrica />
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{width:"50vw", height:"30vh"}}>
            <MyResponsivePie/>
          </div>
          <div style={{width:"40vw", height:"50vh"}}>
            <MyResponsiveBar/>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "500px" }}>
      </div>
      <TableMain />
    </div>
  )
}

export default Home

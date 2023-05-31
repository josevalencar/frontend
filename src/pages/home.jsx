import React from 'react'
import MapaFabrica from '../components/map'
import TableMain from '../components/tableMain.jsx';
import MiniDrawer from '../components/sidebar.jsx'


const Home = () => {
  return (
    <div>
      <MiniDrawer/>
      <MapaFabrica />
      <TableMain />

    </div>
  )
}

export default Home

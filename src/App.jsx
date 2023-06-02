import './global.css';
import Nav from './components/nav'
import MiniDrawer from './components/sidebar';
import Router from './router'
import React from 'react'

function App() {
  return (
    <>
      <MiniDrawer />
      <Router />
    </>
  );
}

export default App;

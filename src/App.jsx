import './global.css';
import MiniDrawer from './components/sidebar';
import Router from './router'
import React from 'react'



function App() {
  
  const [haveUnread, updateHaveUnread] = React.useState(false);
  
  console.log(haveUnread)

  return (
    <>
      <MiniDrawer haveUnread={haveUnread} updateHaveUnread={updateHaveUnread}/>
      <div style={{width: "95%", float: "right"}}>
        <Router updateHaveUnread={updateHaveUnread}/>
      </div>
    </>
  );
}

export default App;

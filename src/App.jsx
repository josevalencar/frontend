import './global.css';
import MiniDrawer from './components/sidebar';
import Router from './router'
import React from 'react'



function App() {
  
  const [haveUnread, updateHaveUnread] = React.useState(false);
  const [isAI, updateIsAI] = React.useState(false);
  
  console.log(haveUnread)

  return (
    <>
      <MiniDrawer haveUnread={haveUnread} updateHaveUnread={updateHaveUnread}/>
      <div style={{width: "95%", float: "right"}}>
        <Router updateHaveUnread={updateHaveUnread} isAI={isAI} updateIsAI={updateIsAI}/>
      </div>
    </>
  );
}

export default App;

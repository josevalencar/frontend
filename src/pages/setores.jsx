import { Route, Switch, useLocation } from 'react-router-dom';
import React from 'react'

const Setores = () => {
  const location = useLocation();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        Estou na página: {location.pathname} {/* Exibe a rota atual */}
      </div>
    </div>
  );
}
    //<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>



export default Setores 

import './global.css';
import { Link, Route, Routes } from 'react-router-dom'
import Colaboradores from './pages/colaboradores'
import Home from './pages/home'
import Nav from './components/nav'
import Colaborador from './pages/colaborador'

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="colaboradores">
          <Route path="" element={<Colaboradores />} />
          <Route path=":colaboradorId" element={<Colaborador />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

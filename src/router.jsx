import { Route, Routes } from 'react-router-dom'
import Colaboradores from './pages/colaboradores'
import Home from './pages/home'
import Notifications from './pages/notifications'
import Colaborador from './pages/colaborador'

import React from 'react'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notificacoes" element={<Notifications />} />
      <Route path="colaboradores">
        <Route path="" element={<Colaboradores />} />
        <Route path=":colaboradorId" element={<Colaborador />} />
      </Route>
    </Routes>
  )
}

export default Router

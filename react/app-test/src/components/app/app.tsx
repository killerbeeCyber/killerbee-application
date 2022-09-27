import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './app.scss'

import logo from '../../../img/logo.png'
import LoginPage from '../loginPage/loginPage'
import FreezbeeList from '../freezbeeList/freezbeeList'
import MenuRouter from '../menuRouter/menuRouter'
import CreateAccountPage from '../createAccountPage/createAccountPage'
import IngredientList from '../ingredientList/ingredientList'
import ProcedeList from '../procedeList/procedeList'
import CreateProcede from '../createProcede/createProcede'
import PatchProcede from '../patchProcede/patchProcede'

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="header">
          <div className="header__content">
            <img src={logo} className="header__logo" alt="logo" />
            <p className="header__title">Killerbee ERP</p>
          </div>
        </div>

        <Routes>
          <Route path="" element={<MenuRouter />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<CreateAccountPage />} />

            <Route path="freezbees/dish" element={<FreezbeeList />} />
            <Route path="ingredients" element={<IngredientList />} />
            <Route path="procedes" element={<ProcedeList />} />
            <Route path="createProcede" element={<CreateProcede />} />
            <Route path="procede/patch/:id" element={<PatchProcede/>}/>
            
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
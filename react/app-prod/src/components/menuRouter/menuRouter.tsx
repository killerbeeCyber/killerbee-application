import React, { useEffect, useState } from 'react'
import { MenuButton } from 'alemkb-components'
import userSolid from './../../../img/user-solid.svg'
import plusSolid from './../../../img/plus-solid.svg'
import burgerSolid from './../../../img/burger-solid.svg'
import plusMenuSolid from './../../../img/burger-and-soda-add.svg'
import deliveryIcon from './../../../img/delivery.svg'
import userPenSolid from './../../../img/user-pen-solid.svg'
import dashboardIcon from './../../../img/dashboard.svg'

import './menuRouter.scss'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'


interface IProps {}

export default function MenuRouter(props: IProps) {
  const [openedPage, setOpenedPage] = useState<string>()
  const location = useLocation()
  const [cookies] = useCookies(['api-token'])
  const [isLogged, setIsLogged] = useState(false)

  let tokenPayload = cookies['api-token']


  useEffect(() => {
    setOpenedPage('Login')
    if (tokenPayload) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [cookies])

  useEffect(() => {
    if (
      location.pathname == '/login' ||
      location.pathname == '/register' ||
      location.pathname == '/register'
    ) {
      setOpenedPage('Login')
    } else if (location.pathname == '/ingredients') {
      setOpenedPage('Mes ingredients')
    }else if (location.pathname == '/procedes') {
        setOpenedPage('Mes procedes')
    }else if (location.pathname == '/createFreezbee') {
      setOpenedPage('Créer Freezbees')}
    }, [location.pathname])

  return (
    <div className="menuRouter">
      <div className="menuRouter__menu">
      {!isLogged &&
        <>
        <Link to="/login">
          <button
            className={openedPage == 'Login' ? 'menuButton menuButton__clicked' : 'menuButton'}
            onClick={() => {
              setSelectedButton(setOpenedPage)
            }}
          >
            <div className="menuButton__content">
              <img className="menuButton__logo" src={userSolid}></img>
              <p>Login</p>
            </div>
          </button>
        </Link>
        </>
        } 
        {isLogged &&
        <>
        <Link to="/freezbees/dish">
        <button
            className={openedPage == 'Mes freezbees' ? 'menuButton menuButton__clicked' : 'menuButton'}
            onClick={() => {
              setSelectedButton(setOpenedPage)
            }}
          >
            <div className="menuButton__content">
              <img className="menuButton__logo" src={burgerSolid}></img>
              <p>Mes freezbees</p>
            </div>
          </button>
        </Link>
        </>
        }
        {isLogged &&
        <>
        <Link to="/ingredients">
          <button
              className={openedPage == 'Mes ingredients' ? 'menuButton menuButton__clicked' : 'menuButton'}
              onClick={() => {
                setSelectedButton(setOpenedPage)
              }}
            >
              <div className="menuButton__content">
                <img className="menuButton__logo" src={burgerSolid}></img>
                <p>Mes ingredients</p>
              </div>
            </button>
          </Link>
        </>
        }
        {isLogged &&
        <>
        <Link to="/procedes">
          <button
              className={openedPage == 'Mes Procedes' ? 'menuButton menuButton__clicked' : 'menuButton'}
              onClick={() => {
                setSelectedButton(setOpenedPage)
              }}
            >
              <div className="menuButton__content">
                <img className="menuButton__logo" src={burgerSolid}></img>
                <p>Mes Procedes</p>
              </div>
            </button>
          </Link>
        </>
        }
        {isLogged &&
        <>
        <Link to="/createFreezbee">
          <button
              className={openedPage == 'Créer Freezbees' ? 'menuButton menuButton__clicked' : 'menuButton'}
              onClick={() => {
                setSelectedButton(setOpenedPage)
              }}
            >
              <div className="menuButton__content">
                <img className="menuButton__logo" src={burgerSolid}></img>
                <p>Créer un freezbee</p>
              </div>
            </button>
          </Link>
        </>
        }
      </div>
      <div className="menuRouter__content">
        <Outlet />
      </div>
    </div>
  )
}

function setSelectedButton(setOpenedPage: React.Dispatch<React.SetStateAction<string | undefined>>) {
  throw new Error('Function not implemented.')
}

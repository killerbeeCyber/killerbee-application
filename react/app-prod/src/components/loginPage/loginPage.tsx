import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Button, Title, ErrorMsg, SuccessMsg } from 'alemkb-components'
import { Link, useNavigate } from 'react-router-dom'
import loader from './../../../img/loader.gif'
import './loginPage.scss'

interface IProps {}

export default function LoginPage(props: IProps) {
  const [, setCookie] = useCookies(['api-token'])
  const [success, setSuccess] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="loginPage">
      <div className="loginPage__content">
        <div className="loginPage__title">
          <div className="title"><p>login</p></div>
        </div>

        <form
          className="loginPage__form"
          onSubmit={(event: any) => {
            event.preventDefault()
            setIsLoading(true)
            const loginData = {
              username: event.target.elements.username.value,
              password: event.target.elements.password.value,
            }
            fetch('http://localhost:8000/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(loginData),
            })
              .then((response) => {
                if (response.ok) {
                  setSuccess('success')
                  event.target.reset()
                  navigate('/')         
                } else  {
                  setSuccess('error')
                  event.target.reset()
                }
                return response.json()
              })
              .then((response) => {
                setCookie('api-token', response.token, { path: '/' })
                setIsLoading(false)
              })
          }}
        >
          <input
            required
            type="text"
            name="username"
            id="username"
            className="loginPage__formField"
            placeholder="Nom d'utilisateur"
          />
          <input
            required
            type="password"
            name="password"
            id="password"
            className="loginPage__formField"
            placeholder="Mot de passe"
          />
          <div className="loginPage__formSubmit">
          <button className="button">Connexion</button>
          </div>
        </form>
        {isLoading && (
          <div className="loginPage__loaderZone">
            <img className="loginPage__loader" src={loader} alt="loader" />
          </div>
        )}
        {success == 'error' && (
          <div>
            <div className='errorMsg'>Erreur lors de la connexion</div>
          </div>
        )}
        {success == 'success' && (
          <div>
            <div className='successMsg'>vous êtes connecté</div>
          </div>
        )}
        <div className="loginPage__router">
          <button className="loginPage__routerButton">
            <Link to="/register"> Je n'ai pas encore de compte </Link>
          </button>
        </div>
        <div className="loginPage__router">
          <button className="loginPage__routerButton">
            <Link to="/forget_password">Mot de passe oublié</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { Title, Button, ErrorMsgLogin } from 'mme-components'
import { Link } from 'react-router-dom'

import './createAccountPage.scss'

interface IProps {}

export default function CreateAccountPage(props: IProps) {
  const [errorZoneVisible, setErrorZoneVisible] = useState<boolean>(false)

  function accountValidation(event: any) {
    event.preventDefault()

    if (event.target.elements.password.value != event.target.elements.repeatPassword.value) {
      setErrorZoneVisible(true)
      return
    }

    const registerData = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
      phone: event.target.elements.phone.value,
      email: event.target.elements.email.value,
      address: event.target.elements.address.value
    }

    fetch('http://localhost:8000/api/auth/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then((response) => {})
  }

  return (
    <div className="createAccountPage">
      <div className="createAccountPage__content">
        <div className="createAccountPage__title">
            <div className="loginPage__title">
                <div className="title"><p>register</p></div>
            </div>
        </div>

        <div
            className={
                errorZoneVisible ? 'errorMsgLogin errorVisible' : 'errorMsgLogin'
            }
            >
            Erreur dans la confirmation du mot de passe
        </div>

        <form onSubmit={accountValidation} className="createAccountPage__form">
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
            type="email"
            name="Email"
            id="email"
            className="createAccountPage__formField"
            placeholder="Email"
          />
          <input
            required
            type="text"
            name="phone"
            id="phone"
            className="loginPage__formField"
            placeholder="Numéro de téléphone"
          />
          <input
            required
            type="text"
            name="address"
            id="address"
            className="loginPage__formField"
            placeholder="Adresse"
          />
          <input
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
            type="password"
            name="password"
            id="password"
            className="createAccountPage__formField"
            placeholder="Mot de passe"
          />
          <p className="createAccountPage__pwRequirement">
            Le champs doit contenir au moins huit caractères avec des lettres majuscules, lettres
            minuscules, chiffres
          </p>
          <input
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
            type="password"
            name="repeat_password"
            id="repeatPassword"
            className="createAccountPage__formField"
            placeholder="Confirmation du Mot de passe"
          />
          <div className="createAccountPage__formSubmit">
          <button className="button">Valider</button>
          </div>
        </form>
        <div className="createAccountPage__router">
          <button className="createAccountPage__routerButton">
            <Link to="/login">Me connecter</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
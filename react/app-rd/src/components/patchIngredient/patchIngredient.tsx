import React, { useState } from 'react'
import { Title, Button, ErrorMsg, SuccessMsg } from 'mme-components'
import {useSelector } from 'react-redux'

import './patchIngredient.scss'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import { IIngredients } from '../types'
import { patchToApi } from '../../apiTools'
import { selectIngredients } from '../ingredientList/ingredientSlice'

interface IProps {}

export default function PatchIngredient(props: IProps) {
  const [success, setSuccess] = useState<string>('')
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const ingredient = location.state as IIngredients

  function patchIngredient(event: any) {
    {
      event.preventDefault()
      const requestBody = {
        nom: event.target.elements.ingredientNom.value,
        description: event.target.elements.ingredientDescription.value,
        img: event.target.elements.ingredientImg.value,
      }
      patchToApi(`/api/prod/ingredient/${params.id}`, requestBody).then(
        (response) => {
          if (response.ok === true) {
            setSuccess('success')
            event.target.reset()
            navigate(-1)
          } else if (response.ok === false) {
            setSuccess('error')
            event.target.reset()
          }
        }
      )
    }
  }

  return (
    <div>
      <div className="patchIngredient">
        <div className="patchIngredient__content">
          <div className="patchIngredient__title">
            <Title title="Modifier l'ingredient"></Title>
          </div>

          <form onSubmit={patchIngredient} className="patchIngredient__form">
            <input
              defaultValue={ingredient.nom}
              required
              placeholder="Nom"
              className="patchIngredient__formField"
              type="text"
              name="ingredientNom"
            ></input>
            <input
              defaultValue={ingredient.description}
              required
              placeholder="Description"
              className="patchIngredient__formField"
              type="text"
              name="ingredientDescription"
            ></input>
            <input
              defaultValue={ingredient.img}
              pattern="(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpg|gif|png|jpeg))(?:\?([^#]*))?(?:#(.*))?"
              placeholder="Lien image"
              className="patcIngredient__formField"
              type="text"
              name="menuImg"
            ></input>

            <div className="patchIngredient__formSubmit">
              <Button text={'Valider'}></Button>
            </div>
          </form>

          {success == 'error' && (
            <div>
              <ErrorMsg text="Votre ingredient n'a pas pu être ajouté"></ErrorMsg>
            </div>
          )}
          {success == 'success' && (
            <div>
              <SuccessMsg text="Votre ingredient a bien été créé"></SuccessMsg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
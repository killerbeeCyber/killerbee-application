import React, { useState } from 'react'
import { Title, Button, ErrorMsg, SuccessMsg } from 'mme-components'
import { useDispatch, useSelector } from 'react-redux'

import './createIngredient.scss'
import { add } from '../ingredientList/ingredientSlice'
import { postToApi } from '../../apiTools'
import { IIngredients } from '../types'
import { selectIngredients } from '../ingredientList/ingredientSlice'

interface IProps {}

export default function CreateIngredient(props: IProps) {
  const [success, setSuccess] = useState<string>('')
  const ingredients = useSelector(selectIngredients)
  const dispatch = useDispatch()

  function addIngredient(event: any) {
    event.preventDefault()
    const requestBody = {
      nom: event.target.elements.ingredientNom.value,
      description: event.target.elements.ingredientDescription.value,
      img: event.target.elements.ingredientImg.value,
    }
    postToApi('/api/prod/ingredient', requestBody).then((response) => {
      if (response.ok === true) {
        setSuccess('success')
        event.target.reset()
        response.json().then((response) => {
          dispatch(add(response))
        })
      } else if (response.ok === false) {
        setSuccess('error')
      }
    })
  }

  return (
    <div className="createIngredient">
      <div className="createIngredient__content">
        <div className="createIngredient__title">
          <Title title="Ajouter un nouvel Ingredient"></Title>
        </div>

        <form onSubmit={addIngredient} className="createIngredient__form">
          <input
            required
            placeholder="Nom"
            className="createIngredient__formField"
            type="text"
            name="ingredientNom"
          ></input>
          <input
            required
            placeholder="Description"
            className="createIngredient__formField"
            type="text"
            name="ingredientDescription"
          ></input>
          <input
            pattern="(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpg|gif|jpeg|png|JPG))(?:\?([^#]*))?(?:#(.*))?"
            placeholder="Lien image"
            className="createIngredient__formField"
            type="text"
            name="ingredientImg"
          ></input>
          <div className="createIngredient__formSubmit">
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
  )
}
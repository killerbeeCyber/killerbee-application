import React, { useState } from 'react'
import { Title, Button, ErrorMsg, SuccessMsg } from 'mme-components'
import { useDispatch, useSelector } from 'react-redux'

import './createProcede.scss'
import { add } from '../procedeList/procedeSlice'
import { postToApi } from '../../apiTools'
import { IIngredients } from '../types'
import { selectIngredients } from '../ingredientList/ingredientSlice'

interface IProps {}

export default function CreateProcede(props: IProps) {
  const [success, setSuccess] = useState<string>('')
  const ingredients = useSelector(selectIngredients)
  const dispatch = useDispatch()

  function addProcede(event: any) {
    event.preventDefault()
    const requestBody = {
      nom: event.target.elements.procedeNom.value,
      description: event.target.elements.procedeDescription.value,
      modele: event.target.elements.procedeModele.value,
      etapes : event.target.elements.procedeEtapes.value,
      validation :event.target.elements.procedeValidation.value,
      tests : event.target.elements.procedeTests.value,
      img: event.target.elements.procedeImg.value,
    }
    postToApi('/api/test/procede', requestBody).then((response) => {
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
    <div className="createProcede">
      <div className="createProcede__content">
        <div className="createProcede__title">
          <Title title="Ajouter un nouvel Procede"></Title>
        </div>

        <form onSubmit={addProcede} className="createProcede__form">
          <input
            required
            placeholder="Nom"
            className="createProcede__formField"
            type="text"
            name="procedeNom"
          ></input>
          <input
            required
            placeholder="Description"
            className="createProcede__formField"
            type="text"
            name="procedeDescription"
          ></input>
          <input
            placeholder="modele"
            className="createProcede__formField"
            required
            type="text"
            name="procedeModele"
          ></input>
          <input
            placeholder="etapes"
            className="createProcede__formField"
            required
            type="text"
            name="procedeEtapes"
          ></input>
          <input
            placeholder="validation"
            className="createProcede__formField"
            required
            type="text"
            name="procedeValidation"
          ></input>
          <input
            placeholder="Tests"
            className="createProcede__formField"
            required
            type="text"
            name="procedeTests"
          ></input>
          <input
            pattern="(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpg|gif|jpeg|png|JPG))(?:\?([^#]*))?(?:#(.*))?"
            placeholder="Lien image"
            className="createProcede__formField"
            type="text"
            name="procedeImg"
          ></input>

          <div className="createProcede__formSubmit">
            <Button text={'Valider'}></Button>
          </div>
        </form>

        {success == 'error' && (
          <div>
            <ErrorMsg text="Votre procede n'a pas pu être ajouté"></ErrorMsg>
          </div>
        )}
        {success == 'success' && (
          <div>
            <SuccessMsg text="Votre procede a bien été créé"></SuccessMsg>
          </div>
        )}
      </div>
    </div>
  )
}
import React, { useState } from 'react'
import { Title, Button, ErrorMsg, SuccessMsg } from 'mme-components'
import {useSelector } from 'react-redux'

import './patchProcede.scss'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import { IProcedes, IIngredients } from '../types'
import { patchToApi } from '../../apiTools'
import { selectIngredients } from '../ingredientList/ingredientSlice'

interface IProps {}

export default function PatchProcede(props: IProps) {
  const [success, setSuccess] = useState<string>('')
  const ingredients = useSelector(selectIngredients)
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const procede = location.state as IProcedes

  function patchProcede(event: any) {
    {
      event.preventDefault()
      const ingredientsIds = Array.from(event.target.elements.ingredients)
      .filter((element: any) => element.checked)
      .map((element: any) => element.value)
      const requestBody = {
        nom: event.target.elements.procedeNom.value,
        description: event.target.elements.procedeDescription.value,
        pUht: event.target.elements.procedePUHT.value,
        gamme: event.target.elements.procedeGamme.value,
        ingredient: ingredientsIds,
        grammage: event.target.elements.procedeGrammage.value,
        img: event.target.elements.procedeImg.value,
      }
      patchToApi(`/api/prod/procede/${params.id}`, requestBody).then(
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
      <div className="patchProcede">
        <div className="patchProcede__content">
          <div className="patchProcede__title">
            <Title title="Modifier l'procede"></Title>
          </div>

          <form onSubmit={patchProcede} className="patchProcede__form">
            <input
              defaultValue={procede.nom}
              required
              placeholder="Nom"
              className="patchProcede__formField"
              type="text"
              name="procedeNom"
            ></input>
            <input
              defaultValue={procede.description}
              required
              placeholder="Description"
              className="patchProcede__formField"
              type="text"
              name="procedeDescription"
            ></input>
            <input
              defaultValue={procede.modele}
              placeholder="pUHT"
              className="patchProcede__formField"
              required
              type="text"
              name="procedePUHT"
            ></input>
            <input
              defaultValue={procede.etapes}
              placeholder="Gamme"
              className="patchProcede__formField"
              required
              type="text"
              name="procedeGamme"
            ></input>
            <input
              defaultValue={procede.validation}
              placeholder="Gamme"
              className="patchProcede__formField"
              required
              type="text"
              name="procedeGamme"
            ></input>
            <input
              defaultValue={procede.tests}
              placeholder="Gamme"
              className="patchProcede__formField"
              required
              type="text"
              name="procedeGamme"
            ></input>
            <input
              defaultValue={procede.img}
              pattern="(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpg|gif|png|jpeg))(?:\?([^#]*))?(?:#(.*))?"
              placeholder="Lien image"
              className="patchProcede__formField"
              type="text"
              name="procedeImg"
            ></input>
            <img
              src={procede.img}
              className="patchProcede__img"
              alt={procede.img}
            />
           
            <div className="patchProcede__formSubmit">
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
    </div>
  )
}
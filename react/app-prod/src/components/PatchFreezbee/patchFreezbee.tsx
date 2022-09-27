import React, { useState } from 'react'
import { Title, Button, ErrorMsg, SuccessMsg } from 'mme-components'
import {useSelector } from 'react-redux'

import './patchFreezbee.scss'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import { IFreezbees, IIngredients } from '../types'
import { patchToApi } from '../../apiTools'
import { selectIngredients } from '../ingredientList/ingredientSlice'

interface IProps {}

export default function PatchFreezbee(props: IProps) {
  const [success, setSuccess] = useState<string>('')
  const ingredients = useSelector(selectIngredients)
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const freezbee = location.state as IFreezbees

  function patchFreezbee(event: any) {
    {
      event.preventDefault()
      const ingredientsIds = Array.from(event.target.elements.ingredients)
      .filter((element: any) => element.checked)
      .map((element: any) => element.value)
      const requestBody = {
        nom: event.target.elements.freezbeeNom.value,
        description: event.target.elements.freezbeeDescription.value,
        pUht: event.target.elements.freezbeePUHT.value,
        gamme: event.target.elements.freezbeeGamme.value,
        ingredient: ingredientsIds,
        grammage: event.target.elements.freezbeeGrammage.value,
        img: event.target.elements.freezbeeImg.value,
      }
      patchToApi(`/api/prod/freezbee/${params.id}`, requestBody).then(
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
      <div className="patchFreezbee">
        <div className="patchFreezbee__content">
          <div className="patchFreezbee__title">
            <Title title="Modifier l'freezbee"></Title>
          </div>

          <form onSubmit={patchFreezbee} className="patchFreezbee__form">
            <input
              defaultValue={freezbee.nom}
              required
              placeholder="Nom"
              className="patchFreezbee__formField"
              type="text"
              name="freezbeeNom"
            ></input>
            <input
              defaultValue={freezbee.description}
              required
              placeholder="Description"
              className="patchFreezbee__formField"
              type="text"
              name="freezbeeDescription"
            ></input>
            <input
              defaultValue={freezbee.pUHT}
              placeholder="pUHT"
              className="patchFreezbee__formField"
              required
              type="text"
              name="freezbeePUHT"
            ></input>
            <input
              defaultValue={freezbee.gamme}
              placeholder="Gamme"
              className="patchFreezbee__formField"
              required
              type="text"
              name="freezbeeGamme"
            ></input>
            <input
              defaultValue={freezbee.img}
              pattern="(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpg|gif|png|jpeg))(?:\?([^#]*))?(?:#(.*))?"
              placeholder="Lien image"
              className="patchFreezbee__formField"
              type="text"
              name="freezbeeImg"
            ></input>
            <img
              src={freezbee.img}
              className="patchFreezbee__img"
              alt={freezbee.img}
            />
            <div className="patchMenu__inputZone">
                <p> Ingredients :</p>
                {ingredients &&
                    ingredients.map((element: IIngredients) => (
                    <div className="patchMenu__input">
                        <input
                        key={element._id}
                        name="articles"
                        value={element._id}
                        type="checkbox"
                        defaultChecked={freezbee.ingredient
                            .map((ingredient: IIngredients) => ingredient._id)
                            .includes(element._id)}
                        />
                        <label>
                            Nom: {element.nom} , Type: {element.description}
                        </label>
                    </div>
                    ))}
                <input 
                    placeholder='grammage'
                    className='createFreezbee__formField'
                    type="text"
                     name='freezbeeGrammage'
                ></input>
            </div>
            <div className="patchFreezbee__formSubmit">
              <Button text={'Valider'}></Button>
            </div>
          </form>

          {success == 'error' && (
            <div>
              <ErrorMsg text="Votre freezbee n'a pas pu être ajouté"></ErrorMsg>
            </div>
          )}
          {success == 'success' && (
            <div>
              <SuccessMsg text="Votre freezbee a bien été créé"></SuccessMsg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
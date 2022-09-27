import React, { useState } from 'react'
import { Title, Button, ErrorMsg, SuccessMsg } from 'mme-components'
import { useDispatch, useSelector } from 'react-redux'

import './createFreezbee.scss'
import { add } from '../freezbeeList/freezbeeSlice'
import { postToApi } from '../../apiTools'
import { IIngredients } from '../types'
import { selectIngredients } from '../ingredientList/ingredientSlice'

interface IProps {}

export default function CreateFreezbee(props: IProps) {
  const [success, setSuccess] = useState<string>('')
  const ingredients = useSelector(selectIngredients)
  const dispatch = useDispatch()

  function addFreezbee(event: any) {
    event.preventDefault()
    const ingredientsIds = Array.from(event.target.elements.ingredients)
        .filter((element: any) => element.checked)
        .map((element: any) => element.value)
    const requestBody = {
      nom: event.target.elements.freezbeeNom.value,
      description: event.target.elements.freezbeeDescription.value,
      pUHT: event.target.elements.freezbeePUHT.value,
      gamme : event.target.elements.freezbeeGamme.value,
      ingredient : ingredientsIds,
      grammage : event.target.elements.freezbeeGrammage.value,
      img: event.target.elements.freezbeeImg.value,
    }
    postToApi('/api/prod/freezbee', requestBody).then((response) => {
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
    <div className="createFreezbee">
      <div className="createFreezbee__content">
        <div className="createFreezbee__title">
          <Title title="Ajouter un nouvel Freezbee"></Title>
        </div>

        <form onSubmit={addFreezbee} className="createFreezbee__form">
          <input
            required
            placeholder="Nom"
            className="createFreezbee__formField"
            type="text"
            name="freezbeeNom"
          ></input>
          <input
            required
            placeholder="Description"
            className="createFreezbee__formField"
            type="text"
            name="freezbeeDescription"
          ></input>
          <input
            placeholder="pUHT"
            className="createFreezbee__formField"
            required
            type="text"
            name="freezbeePUHT"
          ></input>
          <input
            placeholder="gamme"
            className="createFreezbee__formField"
            required
            type="text"
            name="freezbeeGamme"
          ></input>
          <input
            pattern="(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\.(?:jpg|gif|jpeg|png|JPG))(?:\?([^#]*))?(?:#(.*))?"
            placeholder="Lien image"
            className="createFreezbee__formField"
            type="text"
            name="freezbeeImg"
          ></input>
            <div className="createFreezbee__inputZone">
                <p> Ingredients :</p>
                {ingredients &&
                    ingredients.map((element: IIngredients) => (
                        <div className="createFreezbee__formField" key={element._id}>
                        <input name="ingredients" value={element._id} type="checkbox" />
                        <label>
                            Nom: {element.nom}, Description: {element.description}
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

          <div className="createFreezbee__formSubmit">
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
  )
}
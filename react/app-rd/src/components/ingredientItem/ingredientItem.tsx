import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import penSolid from './../../../img/pen-solid.svg'
import trashSolid from './../../../img/trash-solid.svg'
import circleCheckSolid from './../../../img/circle-check-solid.svg'
import circleXmarkSolid from './../../../img/circle-xmark-solid.svg'

import './ingredientItem.scss'

import { IIngredients } from '../types'
import { remove } from '../ingredientList/ingredientSlice'
import { deleteFromApi } from '../../apiTools'

interface IProps {
  ingredient: IIngredients
}

export default function IngredientItem(props: IProps) {
  const { ingredient } = props
  const [toDelete, setToDelete] = useState<boolean>(false)
  const dispatch = useDispatch()

  function deleteIngredient() {
    deleteFromApi(`/api/rd/ingredient/${ingredient._id}`).then((response) => {
      if (response.ok === true) {
        dispatch(remove(ingredient))
      } else if (response.ok === false) {
      }
    })
  }

  return (
    <div className="ingredientItem">
      <div className="ingredientItem__imgZone">
        <img className="ingredientItem__img" src={ingredient.img} />
      </div>
      <>
        <div className="ingredientItem__title">
          <p>{ingredient.nom}</p>
        </div>

        <div className="ingredientItem__type">{ingredient.description}</div>

        {toDelete === false && (
          <div className="ingredientItem__confirmZone">
            <button className="ingredientItem__edit">
              <Link to={'/ingredient/patch/' + ingredient._id} state={ingredient}>
                <div className="ingredientItem__buttonPatch">
                  <img className="ingredientItem__logoButton" src={penSolid}></img>
                  <p> Modifier</p>
                </div>
              </Link>
            </button>
            <button
              className="ingredientItem__edit"
              onClick={() => setToDelete(true)}
            >
              <div className="ingredientItem__button">
                <img className="ingredientItem__logoButton" src={trashSolid}></img>
                <p> Supprimer</p>
              </div>
            </button>
          </div>
        )}
        {toDelete && toDelete === true && (
          <div className="ingredientItem__confirmZone">
            <button
              className="ingredientItem__edit ingredientItem__editConfirm"
              onClick={() => deleteIngredient()}
            >
              <div className="ingredientItem__confirm">
                <img
                  className="ingredientItem__logoButton"
                  src={circleCheckSolid}
                ></img>
                <p> Confirmer </p>
              </div>
            </button>
            <button
              className="ingredientItem__cancel"
              onClick={() => setToDelete(false)}
            >
              <div className="ingredientItem__button">
                <img
                  className="ingredientItem__logoButton"
                  src={circleXmarkSolid}
                ></img>
                <p> Annuler </p>
              </div>
            </button>
          </div>
        )}
      </>
    </div>
  )
}
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
    deleteFromApi(`/api/ingredient/ingredient/${ingredient._id}`).then((response) => {
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
          <p>{ingredient.description}</p>
        </div>

        <div className="ingredientItem__type">{ingredient.type}</div>

        {toDelete === false && (
          <div className="menuItem__confirmZone">
            <button className="menuItem__edit">
              <Link to={'/ingredient/patch/' + ingredient._id} state={ingredient}>
                <div className="menuItem__buttonPatch">
                  <img className="menuItem__logoButton" src={penSolid}></img>
                  <p> Modifier</p>
                </div>
              </Link>
            </button>
            <button
              className="menuItem__edit"
              onClick={() => setToDelete(true)}
            >
              <div className="menuItem__button">
                <img className="menuItem__logoButton" src={trashSolid}></img>
                <p> Supprimer</p>
              </div>
            </button>
          </div>
        )}
        {toDelete && toDelete === true && (
          <div className="menuItem__confirmZone">
            <button
              className="menuItem__edit menuItem__editConfirm"
              onClick={() => deleteIngredient()}
            >
              <div className="menuItem__confirm">
                <img
                  className="menuItem__logoButton"
                  src={circleCheckSolid}
                ></img>
                <p> Confirmer </p>
              </div>
            </button>
            <button
              className="menuItem__cancel"
              onClick={() => setToDelete(false)}
            >
              <div className="menuItem__button">
                <img
                  className="menuItem__logoButton"
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
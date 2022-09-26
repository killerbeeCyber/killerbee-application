import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import penSolid from './../../../img/pen-solid.svg'
import trashSolid from './../../../img/trash-solid.svg'
import circleCheckSolid from './../../../img/circle-check-solid.svg'
import circleXmarkSolid from './../../../img/circle-xmark-solid.svg'

import './procedeItem.scss'

import { IProcedes } from '../types'
import { remove } from '../procedeList/procedeSlice'
import { deleteFromApi } from '../../apiTools'

interface IProps {
  procede: IProcedes
}

export default function ProcedeItem(props: IProps) {
  const { procede } = props
  const [toDelete, setToDelete] = useState<boolean>(false)
  const dispatch = useDispatch()

  function deleteProcede() {
    deleteFromApi(`/api/procede/procede/${procede._id}`).then((response) => {
      if (response.ok === true) {
        dispatch(remove(procede))
      } else if (response.ok === false) {
      }
    })
  }

  return (
    <div className="procedeItem">
      <div className="procedeItem__imgZone">
        <img className="procedeItem__img" src={procede.img} />
      </div>
      <>
        <div className="procedeItem__title">
          <p>{procede.nom}</p>
          <p>{procede.description}</p>
        </div>

        {toDelete === false && (
          <div className="menuItem__confirmZone">
            <button className="menuItem__edit">
              <Link to={'/procede/patch/' + procede._id} state={procede}>
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
              onClick={() => deleteProcede()}
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
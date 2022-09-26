import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import penSolid from './../../../img/pen-solid.svg'
import trashSolid from './../../../img/trash-solid.svg'
import circleCheckSolid from './../../../img/circle-check-solid.svg'
import circleXmarkSolid from './../../../img/circle-xmark-solid.svg'

import './freezbeeItem.scss'

import { IFreezbees } from '../types'
import { remove } from '../freezbeeList/freezbeeSlice'
import { deleteFromApi } from '../../apiTools'

interface IProps {
  freezbee: IFreezbees
}

export default function FreezbeeItem(props: IProps) {
  const { freezbee } = props
  const [toDelete, setToDelete] = useState<boolean>(false)
  const dispatch = useDispatch()

  function deleteFreezbee() {
    deleteFromApi(`/api/freezbee/freezbee/${freezbee._id}`).then((response) => {
      if (response.ok === true) {
        dispatch(remove(freezbee))
      } else if (response.ok === false) {
      }
    })
  }

  return (
    <div className="freezbeeItem">
      <div className="freezbeeItem__imgZone">
        <img className="freezbeeItem__img" src={freezbee.img} />
      </div>
      <>
        <div className="freezbeeItem__title">
          <p>{freezbee.nom}</p>
          <p>{freezbee.description}</p>
        </div>

        {toDelete === false && (
          <div className="menuItem__confirmZone">
            <button className="menuItem__edit">
              <Link to={'/freezbee/patch/' + freezbee._id} state={freezbee}>
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
              onClick={() => deleteFreezbee()}
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
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './ingredientList.scss'
import loader from './../../../img/loader.gif'
import { selectIngredients, set as setIngredients } from './ingredientSlice'
import { IIngredients} from '../types'

import IngredientItem from '../ingredientItem/ingredientItem'
import { getFromApi } from '../../apiTools'
import { useCookies } from 'react-cookie'
import { Buffer } from 'buffer'

interface IProps {}

export default function IngredientList(props: IProps) {
  const ingredients = useSelector(selectIngredients)
  const dispatch = useDispatch()
  const [cookies] = useCookies(['api-token'])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let tokenPayload = cookies['api-token']
    tokenPayload = JSON.parse(
      Buffer.from(tokenPayload.split('.')[1], 'base64').toString()
    )
    setIsLoading(true)

    getFromApi(
      `/api/rd/ingredient`
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch(setIngredients(response))
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    let tokenPayload = cookies['api-token']
    tokenPayload = JSON.parse(
      Buffer.from(tokenPayload.split('.')[1], 'base64').toString()
    )
  }, [])

  return (
    <div className="ingredientList">
      <div className="title"><p> ingredients</p></div>
      <div className="ingredientList__content">
        {isLoading && <img src={loader} alt="loader" width="80" height="60" />}
        {ingredients &&
          ingredients.map((element: IIngredients) => (
            <IngredientItem key={element._id} ingredient={element}></IngredientItem>
          ))}
      </div>
    </div>
  )
}
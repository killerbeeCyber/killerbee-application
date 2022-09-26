import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './freezbeeList.scss'
import loader from './../../../img/loader.gif'
import { selectFreezbees, set as setFreezbees } from './freezbeeSlice'
import { IFreezbees} from '../types'

import FreezbeeItem from '../freezbeeItem/freezbeeItem'
import { getFromApi } from '../../apiTools'
import { useCookies } from 'react-cookie'
import { Buffer } from 'buffer'

interface IProps {}

export default function FreezbeeList(props: IProps) {
  const freezbees = useSelector(selectFreezbees)
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
      `/api/freezbee/freezbee?restaurateur=${tokenPayload.ownedRestaurants}`
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch(setFreezbees(response))
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
    <div className="freezbeeList">
      <div className="title"><p> freezbees</p></div>
      <div className="freezbeeList__content">
        {isLoading && <img src={loader} alt="loader" width="80" height="60" />}
        {freezbees &&
          freezbees.map((element: IFreezbees) => (
            <FreezbeeItem key={element._id} freezbee={element}></FreezbeeItem>
          ))}
      </div>
    </div>
  )
}
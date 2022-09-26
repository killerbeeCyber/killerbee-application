import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './procedeList.scss'
import loader from './../../../img/loader.gif'
import { selectProcedes, set as setProcedes } from './procedeSlice'
import { IProcedes} from '../types'

import ProcedeItem from '../procedeItem/procedeItem'
import { getFromApi } from '../../apiTools'
import { useCookies } from 'react-cookie'
import { Buffer } from 'buffer'

interface IProps {}

export default function ProcedeList(props: IProps) {
  const procedes = useSelector(selectProcedes)
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
      `/api/procede/procede?restaurateur=${tokenPayload.ownedRestaurants}`
    )
      .then((response) => response.json())
      .then((response) => {
        dispatch(setProcedes(response))
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
    <div className="procedeList">
      <div className="title"><p> procedes</p></div>
      <div className="procedeList__content">
        {isLoading && <img src={loader} alt="loader" width="80" height="60" />}
        {procedes &&
          procedes.map((element: IProcedes) => (
            <ProcedeItem key={element._id} procede={element}></ProcedeItem>
          ))}
      </div>
    </div>
  )
}
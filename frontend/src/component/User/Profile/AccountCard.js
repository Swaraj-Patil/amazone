import React from 'react'
import { useNavigate } from 'react-router-dom'

const AccountCard = ({ data }) => {

  const navigate = useNavigate()

  return (
    <div className='account__card' onClick={() => navigate(data.url)}>
      <div><img src={data.imgUrl} alt='Icon' /></div>
      <div>
        <h4>{data.title}</h4>
        <p>{data.subtitle}</p>
      </div>
    </div>
  )
}

export default AccountCard

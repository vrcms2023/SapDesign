import React from 'react'

const HomeClients = ({client}) => {
  return (
    <div className='slide'>
        <img src={client.path} alt={client.client_title}  key={client.id} />
    </div>
  )
}

export default HomeClients
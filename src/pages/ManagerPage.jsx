import React from 'react'
import HeaderHome from '../component/ManagerPage/HeaderHomeManager'
import { Outlet } from 'react-router-dom'

const ManagerPage = () => {
  return (
    <div className='container mx-auto'>
        <HeaderHome/>
        <Outlet/>
    </div>
  )
}

export default ManagerPage
import React from 'react'
import { Outlet } from 'react-router-dom'
import MovieManagement from '../component/ManagerPage/MovieManagement'
import HeaderHomeAdmin from '../component/ManagerPage/HeaderHomeManager'

const ManagerPage = () => {
  return (
    <div className='container mx-auto'>
        <HeaderHomeAdmin />
        <Outlet />
    </div>
  )
}

export default ManagerPage
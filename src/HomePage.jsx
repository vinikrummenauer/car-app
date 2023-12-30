import React from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Search from './Components/Search/Search'
import ListaCarros from './Components/ListaCarros/ListaCarros'
import Footer from './Components/Footer/Footer'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Search/>
      <ListaCarros/>
      <Footer/>
    </div>
  )
}

export default HomePage
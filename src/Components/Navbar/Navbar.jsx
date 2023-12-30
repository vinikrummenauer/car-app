import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../../Assets/logo.png'
import {IoIosCloseCircle} from 'react-icons/io'
import {TbGridDots} from 'react-icons/tb'

const Navbar = () => {
  const [header, setHeader] = useState('header')
  const [navbar, setNavbar] = useState('navbar')

  const showNavbar = ()=> {
    setNavbar('navbar showNavbar')
  }

  const removeNavbar = ()=> {
    setNavbar('navbar ')
  }

  const addBg = ()=>{
    if(window.scrollY >= 20){
      setHeader('header addBg')
    }else{
      setHeader('header')
    }
  }
  window.addEventListener('scroll', addBg)

  return (
    <div className={header}>
       <div className="logoDiv">
        <img src={logo} alt="Logo Image" className='logo' />
       </div>

       <div className={navbar}>
        <ul className="menu">
          <li onClick={removeNavbar} className="listItem">
            <a href="/" className="link">Seminovos</a>
          </li>
          <li onClick={removeNavbar} className="listItem">
            <a href="/" className="link">Novos</a>
          </li>
          <li onClick={removeNavbar} className="listItem">
            <a href="/" className="link">Usados</a>
          </li>
        </ul>

          <IoIosCloseCircle className='icon closeIcon' onClick={removeNavbar}/>
         
       </div>

       <div className="signUp flex">
        <div className="text">
          <Link to="/login">Sair</Link>
        </div>
        
         <TbGridDots className='icon toggleNavbarIcon' onClick={showNavbar}/>
       </div>
    </div>
  )
}

export default Navbar
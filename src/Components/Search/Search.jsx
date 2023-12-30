import React, {useEffect} from 'react'
import './Search.css'
import {AiOutlineSearch} from 'react-icons/ai'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Search = () => {
  useEffect(()=>{
  Aos.init(
    {
      duration: 2000
    }
  )
  }, [])


  return (
    <div className='search'>
       <div className="secContainer container">
        <h3 data-aos='fade-up' className="title">
          Encontre o carro que você procura
        </h3>

        <div className="searchDiv grid">
          <input data-aos='fade-up' type="text"  placeholder='Tipo' />
          <input data-aos='fade-up' type="number"  placeholder='Marca' />
          <input data-aos='fade-up' type="text"  placeholder='Modelo' />
          <input data-aos='fade-up' type="number"  placeholder='Preço' />
          <button data-aos='fade-up' className='btn primaryBtn flex'>
            <AiOutlineSearch className='icon'/>
            <span>
              Procurar
            </span>
          </button>
        </div>
       </div>
    </div>
  )
}

export default Search
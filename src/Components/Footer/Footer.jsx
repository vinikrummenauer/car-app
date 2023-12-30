import React, {useEffect} from 'react'
import './Footer.css'
import Aos from 'aos'
import 'aos/dist/aos.css'


const Footer = () => {
  useEffect(()=>{
  Aos.init(
    {
      duration: 2000
    }
  )
  }, [])

  return (
    <div className='footer'>
       <div className="footerContainer container">
        <div className="footerMenuDiv grid">

          <div data-aos='fade-up' className="singleGrid">
            <span className="footerTitle">
              Comprar carro
            </span>
            <ul className="footerUl grid">
              <li className="footerLi">
                 Vender carro
              </li>
              <li className="footerLi">
                App Verzel
              </li>
              <li className="footerLi">
                Onde Estamos
              </li>
              <li className="footerLi">
                 Perguntas frequentes
              </li>
            </ul>
          </div>

          <div data-aos='fade-up' className="singleGrid">
            <span className="footerTitle">
            Blog
            </span>
            <ul className="footerUl grid">
              <li className="footerLi">
              Guia de preços
              </li>
              <li className="footerLi">
              Carreiras
              </li>
              <li className="footerLi">
              Contato
              </li>
              <li className="footerLi">
              Imprensa
              </li>
            </ul>
          </div>

          <div data-aos='fade-up' className="singleGrid">
            <span className="footerTitle">
              Extras
            </span>
            <ul className="footerUl grid">
              <li className="footerLi">
              Recomendações
              </li>
              <li className="footerLi">
              Benefícios
              </li>
              <li className="footerLi">
                Fabricantes
              </li>
              <li className="footerLi">
              Vendedores
              </li>
            </ul>
          </div>

          <div data-aos='fade-up' className="singleGrid">
            <span className="footerTitle">
            Suporte
            </span>
            <ul className="footerUl grid">
              <li className="footerLi">
              Atualizações
              </li>
              <li className="footerLi">
              Unidades
              </li>
              <li className="footerLi">
              Centro de ajuda
              </li>
              <li className="footerLi">
              Privacidade e segurança
              </li>
            </ul>
          </div>
        </div>

        <div className="lowerSection grid">
          <p>2023 Todos os direitos reservados.</p>
          <blockquote>Vinicius Krummenauer</blockquote>
        </div>
       </div>
    </div>
  )
}

export default Footer
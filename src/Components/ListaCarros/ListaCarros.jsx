import React, { useEffect, useState } from "react";
import "./ListaCarros.css";
import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";
import chamarAPI from "../../Services/chamarApi";

const ListaCarros = () => {
  const [carros, setCarros] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });

    const requestAPI = async () => {
      const response = chamarAPI();

      await response
        .get("/carros")
        .then((res) => {
          const newData = res.data.map((carro) => ({
            id: carro.id,
            nome: carro.nome,
            foto: carro.foto,
            preco: carro.preco,
            localizacao: carro.localizacao,
            marca: carro.marca,
            modelo: carro.modelo,
          }));
          setCarros(newData);
        })
        .catch((err) => {
          console.log('ue')
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          setError("Erro ao carregar os dados. Token expirado ou inválido.");
          setTimeout(() => {
            setError("");
          }, 10000);
          console.log("aaa", err);
        });
    };

    requestAPI();
  }, []);

  return (
    <div className="auction section">
      <div className="secContainer container">
        <div data-aos="fade-up" className="secHeading flex">
          <h3 className="secTitle">Resultados</h3>

          <div className="navBtns flex">
            <BsArrowLeftShort className="icon leftIcon" />
            <BsArrowRightShort className="icon rightIcon" />
          </div>
        </div>

        <div className="carContainer grid">
          {carros.length !== 0 &&
            !error &&
            carros.map((carro) => (
              <div
                className={`singleCar grid ${
                  carro.preco < 50000 ? "singleCarActive" : ""
                }`}
                data-aos="fade-up"
                key={carro.id}
              >
                <div className="imgDiv">
                  <img src={carro.foto} alt="Car Image" />
                </div>
                <h5 className="carTitle">{carro.nome}</h5>
                <span className="miles">{carro.localizacao}</span>
                <span className="AWD">
                  {carro.marca} - {carro.modelo}
                </span>
                <div className="price_buyBtn flex">
                  <span className="price">{`R$${carro.preco}`}</span>
                  <span className="buyBtn">Comprar</span>
                </div>
              </div>
            ))}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ListaCarros;

import React, { useState } from "react";
import "./CriarVeiculo.css";
import chamarAPI from "../../Services/chamarApi";
import Swal from "sweetalert2";

const CriarVeiculo = () => {
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [preco, setPreco] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoCarro = {
      nome,
      foto,
      preco,
      localizacao,
      marca,
      modelo,
    };

    try {
      const request = chamarAPI();
      request
        .post('/carros', novoCarro)
        .then((response) => {
          if (response.data.resultado) {
            Swal.fire({
              icon: "success",
              title: "Sucesso!",
              text: "Veículo criado com sucesso!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Erro!",
              text: "Erro ao criar o veículo!",
            });
          }
        });

      setNome("");
      setFoto("");
      setPreco("");
      setLocalizacao("");
      setMarca("");
      setModelo("");
    } catch (error) {
      console.error("Erro ao criar o veículo:", error);
    }
  };

  return (
    <div className="criarVeiculo">
      <h2>Criar Novo Veículo</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nomeInput">Nome:</label>
        <input
          type="text"
          id="nomeInput"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label htmlFor="fotoInput">Link da Foto:</label>
        <input
          type="text"
          id="fotoInput"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
        />

        <label htmlFor="precoInput">Preço:</label>
        <input
          type="text"
          id="precoInput"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <label htmlFor="localizacaoInput">Localização:</label>
        <input
          type="text"
          id="localizacaoInput"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
        />

        <label htmlFor="marcaInput">Marca:</label>
        <input
          type="text"
          id="marcaInput"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <label htmlFor="modeloInput">Modelo:</label>
        <input
          type="text"
          id="modeloInput"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />

        <button type="submit">Criar Veículo</button>
      </form>
    </div>
  );
};

export default CriarVeiculo;

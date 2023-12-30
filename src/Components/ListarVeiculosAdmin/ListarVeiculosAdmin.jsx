import React, { useEffect, useState } from "react";
import "./ListarVeiculosAdmin.css";
import chamarAPI from "../../Services/chamarApi";
import {
  BsArrowRightShort,
  BsArrowLeftShort,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import Swal from "sweetalert2";
import Aos from "aos";

const ListarVeiculosAdmin = () => {
  const [carros, setCarros] = useState([]);
  const [error, setError] = useState("");

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
        setError("Erro ao carregar os dados. Token expirado ou inválido.");
        setTimeout(() => {
          setError("");
        }, 10000);
        console.log("aaa", err);
      });
  };

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
    requestAPI();
  }, []);

  const handleImageClick = (carId) => {
    console.log(carId);
    Swal.fire({
      title: "Editar Imagem",
      input: "text",
      inputLabel: "Novo Link da Imagem",
      inputPlaceholder: "Insira o novo link da imagem",
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      preConfirm: async (newImageLink) => {
        if (!newImageLink) {
          Swal.showValidationMessage("Informe o link da nova imagem");
        }

        try {
          const response = chamarAPI();

          await response
            .put(`/carros/${carId}`, { foto: newImageLink })
            .then((res) => {
              if (res.data.resultado) {
                Swal.fire({
                  title: "Imagem atualizada com sucesso!",
                  icon: "success",
                });
                requestAPI();
              } else {
                Swal.fire({
                  title: "Erro ao atualizar a imagem!",
                  icon: "error",
                });
              }
            });
        } catch (error) {
          console.error("Erro ao atualizar a imagem:", error);
          Swal.showValidationMessage("Erro ao atualizar a imagem");
        }
      },
    });
  };

  const handleNameEditClick = (carId, currentName) => {
    Swal.fire({
      title: "Editar Nome do Carro",
      input: "text",
      inputValue: currentName,
      inputLabel: "Novo Nome do Carro",
      inputPlaceholder: "Insira o novo nome do carro",
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      preConfirm: async (newCarName) => {
        if (!newCarName) {
          Swal.showValidationMessage("Informe o novo nome do carro");
        }

        try {
          const response = chamarAPI();

          await response
            .put(`/carros/${carId}`, { nome: newCarName })
            .then((res) => {
              if (res.data.resultado) {
                Swal.fire({
                  title: "Nome atualizado com sucesso!",
                  icon: "success",
                });
                requestAPI();
              } else {
                Swal.fire({
                  title: "Erro ao atualizar o nome do carro!",
                  icon: "error",
                });
              }
            });
        } catch (error) {
          console.error("Erro ao atualizar o nome do carro:", error);
          Swal.showValidationMessage("Erro ao atualizar o nome do carro");
        }
      },
    });
  };

  const handleLocationEditClick = (carId, currentLocation) => {
    Swal.fire({
      title: "Editar Localização",
      input: "text",
      inputValue: currentLocation,
      inputLabel: "Nova Localização",
      inputPlaceholder: "Insira a nova localização",
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      preConfirm: async (newLocation) => {
        if (!newLocation) {
          Swal.showValidationMessage("Informe a nova localização");
        }

        try {
          const response = chamarAPI();

          await response
            .put(`/carros/${carId}`, { localizacao: newLocation })
            .then((res) => {
              if (res.data.resultado) {
                Swal.fire({
                  title: "Localização atualizada com sucesso!",
                  icon: "success",
                });
                requestAPI();
              } else {
                Swal.fire({
                  title: "Erro ao atualizar a localização!",
                  icon: "error",
                });
              }
            });
        } catch (error) {
          console.error("Erro ao atualizar a localização:", error);
          Swal.showValidationMessage("Erro ao atualizar a localização");
        }
      },
    });
  };

  const handleModelEditClick = (carId, currentModel, currentBrand) => {
    Swal.fire({
      title: "Editar Modelo e Marca do Carro",
      html: `
        <input id="model" class="swal2-input" value="${currentModel}" placeholder="Novo Modelo">
        <input id="brand" class="swal2-input" value="${currentBrand}" placeholder="Nova Marca">
      `,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      preConfirm: async () => {
        const newModel = Swal.getPopup().querySelector("#model").value;
        const newBrand = Swal.getPopup().querySelector("#brand").value;

        if (!newModel || !newBrand) {
          Swal.showValidationMessage("Informe o novo modelo e marca do carro");
          return;
        }

        try {
          const response = chamarAPI();
          const updatedData = {
            modelo: newModel,
            marca: newBrand,
          };

          await response.put(`/carros/${carId}`, updatedData).then((res) => {
            if (res.data.resultado) {
              Swal.fire({
                title: "Modelo e marca atualizados com sucesso!",
                icon: "success",
              });
              requestAPI();
            } else {
              Swal.fire({
                title: "Erro ao atualizar o modelo e marca!",
                icon: "error",
              });
            }
          });
        } catch (error) {
          console.error("Erro ao atualizar o modelo e marca:", error);
          Swal.showValidationMessage("Erro ao atualizar o modelo e marca");
        }
      },
    });
  };

  const handlePriceEditClick = (carId, currentPrice) => {
    Swal.fire({
      title: "Editar Preço do Carro",
      input: "text",
      inputValue: currentPrice.toString(),
      inputLabel: "Novo Preço do Carro",
      inputPlaceholder: "Insira o novo preço do carro",
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      preConfirm: async (newPrice) => {
        if (!newPrice || isNaN(parseFloat(newPrice))) {
          Swal.showValidationMessage("Informe um novo preço válido");
          return;
        }

        try {
          const response = chamarAPI();
          const updatedData = { preco: parseFloat(newPrice) };

          await response.put(`/carros/${carId}`, updatedData).then((res) => {
            if (res.data.resultado) {
              Swal.fire({
                title: "Preço atualizado com sucesso!",
                icon: "success",
              });
              requestAPI();
            } else {
              Swal.fire({
                title: "Erro ao atualizar o preço!",
                icon: "error",
              });
            }
          });
        } catch (error) {
          console.error("Erro ao atualizar o preço:", error);
          Swal.showValidationMessage("Erro ao atualizar o preço");
        }
      },
    });
  };

  const handleDeleteClick = (carId) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, apagar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = chamarAPI();
          await response.delete(`/carros/${carId}`).then((res) => {
            if (res.data.resultado) {
              Swal.fire({
                title: "Carro apagado com sucesso!",
                icon: "success",
              });
              requestAPI();
            } else {
              Swal.fire({
                title: "Erro ao apagar o carro!",
                icon: "error",
              });
            }
          });
        } catch (error) {
          console.error("Erro ao apagar o carro:", error);
          Swal.showValidationMessage("Erro ao apagar o carro");
        }
      }
    });
  };

  return (
    <div className="auction section">
      <div className="secContainer container">
        <div data-aos="fade-up" className="secHeading flex">
          <h3 className="secTitle">Carros para edição</h3>

          <div className="navBtns flex">
            <BsArrowLeftShort className="icon leftIcon" />
            <BsArrowRightShort className="icon rightIcon" />
          </div>
        </div>

        <div className="carContainer grid">
          {carros.map((carro) => (
            <div
              className="singleCar grid singleCarActive"
              data-aos="fade-up"
              key={carro.id}
            >
              <div
                className="imgDiv"
                onClick={() => handleImageClick(carro.id)}
              >
                <img src={carro.foto} alt="Car Image" />
                <BsPencilSquare className="editIcon" />
              </div>
              <div className="carInfo flex">
                <h5 className="carTitle">{carro.nome}</h5>
                <BsPencilSquare
                  className="editIcon-title"
                  onClick={() => handleNameEditClick(carro.id, carro.nome)}
                />
              </div>
              <div className="locationInfo flex">
                <span className="miles">{carro.localizacao}</span>
                <BsPencilSquare
                  className="editIcon-location"
                  onClick={() =>
                    handleLocationEditClick(carro.id, carro.localizacao)
                  }
                />
              </div>
              <div className="modelBrandInfo flex">
                <span className="AWD">
                  {carro.marca} - {carro.modelo}
                </span>
                <BsPencilSquare
                  className="editIcon-modelo-marca"
                  onClick={() =>
                    handleModelEditClick(carro.id, carro.modelo, carro.marca)
                  }
                />
              </div>
              <div className="price_buyBtn flex">
                <span
                  className="price"
                  onClick={() => handlePriceEditClick(carro.id, carro.preco)}
                >{`R$${carro.preco}`}</span>
              </div>
              <div
                className="deleteIcon"
                onClick={() => handleDeleteClick(carro.id)}
              >
                <BsTrash className="deleteIcon-svg" />
              </div>
            </div>
          ))}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ListarVeiculosAdmin;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import ListarVeiculosAdmin from '../ListarVeiculosAdmin/ListarVeiculosAdmin';
import CriarVeiculo from '../CriarVeiculo/CriarVeiculo';
import { BsCarFront, BsClipboard, BsDoorClosed, BsPlus } from 'react-icons/bs';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('list');

  const deleteInfo = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'list':
        return (
          <section>
            <ListarVeiculosAdmin />
            
          </section>
        );
      case 'create':
        return (
          <section>
            <CriarVeiculo />
            
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
    <nav>
      <ul className="dashboard-nav">
        <h2>
         <BsCarFront className="car-icon"/>
          Verzel Cars
        </h2>
        <hr />
        <li>
          <BsClipboard className="car-icon"/>
          <Link to="#" onClick={() => setActiveTab('list')}>Listagem de Veículos</Link>
        </li>
        <li>
          <BsCarFront className="car-icon"/>
          <Link to="#" onClick={() => setActiveTab('create')}>Criar Novo Veículo</Link>
        </li>
        <li onClick={() => deleteInfo()}>
          <BsDoorClosed className="car-icon"/>
          <Link>Logout</Link>
        </li>
      </ul>
    </nav>

      <div className="dashboard-content">
        <h1>Bem-vindo ao Dashboard de Administração</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;

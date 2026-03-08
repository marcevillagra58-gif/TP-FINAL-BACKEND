import React from 'react';
import '../css/principal.css';
import Escritor from '../components/Escritor';
import NewsSection from '../components/NewsSection';
import WeatherWidget from '../components/WeatherWidget';
import { getAssetPath } from '../utils/assetPath.js';

const PrincipalPage = () => {
  return (
    <div className="container">
      <div className="main-content">
        <Escritor
          texto="Bienvenidos a Hurlingham"
          tamano={50}
          color="white"
        />
        <img className="imagen-principal" src={getAssetPath("/assets/Municipio-de-Hurlingham-HOME.jpg")} alt="Municipalidad" />
      </div>
      <div className="weather-wrapper">
        <WeatherWidget />
      </div>
      <NewsSection />
    </div>
  );
};

export default PrincipalPage;
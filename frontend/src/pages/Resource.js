import React from 'react';
import './styles/Resource.css';


import NasaResources from '../components/NasaResources.js';
import EducationalDownloads from '../components/EducationalDownloads.js';
import FurtherLearning from '../components/FurtherLearning.js';

function Resource() {
  return (
    <div className="ResourceSection">
      <header className="App-header">
        <h1>NASA Resource Center</h1>
      </header>

      <section className="resource-content">
        <NasaResources />
        <EducationalDownloads />
        <FurtherLearning />
      </section>

      <footer className="App-footer">
        <p>© 2024 NASA Resource Center</p>
      </footer>
    </div>
  );
}

export default Resource;
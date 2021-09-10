import { useState } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete';

function App() {

  const [population1, setPopulation1] = useState();
  const [population2, setPopulation2] = useState();

  return (
    <div className="App">
      <h1>City Populations</h1>
      <Autocomplete onCityClick={population => setPopulation1(population)} />
      <Autocomplete onCityClick={population => setPopulation2(population)} />
      <label>Difference:</label>
      <span>{population1 && population2 ? Math.abs(population1 - population2) : ''}</span>
    </div>
  );
}

export default App;

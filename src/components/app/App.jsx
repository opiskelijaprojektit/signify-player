import React, { useState } from 'react';
import Scene from "../scene/Scene";
import './App.css';
import Joke from './Joke'; 


import scenesData from '/server/data.json';

const App = () => {
  const [joke, setJoke] = useState('');  

  return (
    <div className="App">
      <h1>Today's Joke</h1>

      {/* Pass the setJoke function to Joke.jsx so it can fetch the joke */}
      <Joke setJoke={setJoke} />

      {/* Pass the joke to Scene.jsx */}
      <Scene scenes={scenesData.scenes} joke={joke} orientation="landscape" />
    </div>
  );
};

export default App;


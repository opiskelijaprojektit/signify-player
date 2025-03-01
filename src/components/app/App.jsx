import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Scene from "../scene/Scene";
import './App.css';
import Joke from './Joke';  // Corrected path to Joke.jsx


// JSON file
import scenesData from '/server/data.json';

const App = () => {
  const [joke, setJoke] = useState(''); 

  // Fetch the joke from the API
  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      setJoke(response.data.joke);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="App">
      <h1>Today's Joke</h1>

      {/* Pass the joke to the Scene component */}
      <Scene scenes={scenesData.scenes} joke={joke} orientation="landscape" />
    </div>
  );
};

export default App;


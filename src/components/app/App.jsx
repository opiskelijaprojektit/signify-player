import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Scene from "../scene/Scene";
import './App.css';

// Assuming this is where your JSON file comes from
import scenesData from '/server/data.json';

const App = () => {
  const [joke, setJoke] = useState(''); // Store the joke

  // Fetch the joke from the API
  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      setJoke(response.data.joke); // Update the joke state
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  // Fetch the joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="App">
      <h1>Today's Joke</h1>

      {/* Pass the scenes from JSON and the joke to the Scene component */}
      <Scene scenes={scenesData.scenes} joke={joke} orientation="landscape" />
    </div>
  );
};

export default App;

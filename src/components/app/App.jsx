import React from 'react';
import Joke from './Joke'; // Varmista, että polku on oikea

const App = () => {
  return (
    <div className="App">
      <h1>Today's Joke</h1>
      <Joke />
    </div>
  );
};

export default App;
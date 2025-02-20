import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Jos käytät Axiosia, varmista että se on asennettu

const Joke = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);

  // Funktio vitsin hakemiseksi API:sta
  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      setJoke(response.data.joke);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setLoading(false);
    }
  };

  // Käynnistetään vitsin haku heti kun komponentti on ladattu
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading joke...</p>
      ) : (
        <p>{joke}</p>
      )}
    </div>
  );
};

export default Joke;

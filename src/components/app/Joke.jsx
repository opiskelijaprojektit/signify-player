import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Joke = ({ setJoke }) => {
  const [loading, setLoading] = useState(true);

  
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

  useEffect(() => {
    fetchJoke();
  }, []);  

  return (
    <div>
      {loading ? (
        <p className="loading-joke">Loading joke...</p>
      ) : null} {/* You can add a loading state if you want */}
    </div>
  );
};

export default Joke;


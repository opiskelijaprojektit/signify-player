import { useEffect, useState } from 'react';
import './Scene-movie.css';

function SceneMovie({ sceneData }) {
  // Tilamuuttuja elokuvan tiedoille
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Funktio, joka hakee elokuvan TMDB API:sta
    async function fetchMovie() {
      // Tarkistetaan ennen kutsua että API-avain löytyy
      if (!sceneData.api_key) {
        console.error("API key is missing!");
        return; // Lopetetaan jos avainta ei ole
      }

      try {
        // Haetaan elokuvadata TMDB API:sta
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${sceneData.api_key}&sort_by=popularity.desc&page=1`);
        // Muutetaan JSON-muotoom 
        const data = await response.json();

        // Tarkistetaan, että kutsu palautti elokuvia
        if (data.results && data.results.length > 0) {
          // Valitaan satunnainen elokuva tuloksista
          const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
          // Päivitetään elokuvan tiedot tilamuuttujaan
          setMovie(randomMovie);
        } else {
          console.error("No movies found from TMDB API!");
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    }

    // Kutsutaan funktiota heti kun komponentti on ladattu
    fetchMovie();
  }, [sceneData?.api_key]); //useEffect suoritetaan aina, kun sceneData.api_key muuttuu

  if (!movie) return <p>Ladataan elokuvaa...</p>;

  // Kun elokuvan tiedot on haettu renderöidään ruudulle
  return (
    <div className="scene-movie">
      <div className="movie-name">
        <h1>{movie.title}</h1>
      </div>
      <p>{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
  );
}

export default SceneMovie;

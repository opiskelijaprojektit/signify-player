import { useEffect } from 'react';
import './Scene-movie.css';
import { fetchMovie } from '../../utils/fetchMovie';
import useLocalStorage from '../../utils/useLocalStorage';

function SceneMovie({ sceneData }) {
  // Tallennetaan elokuva päivän ajaksi localStorageen
  const today = new Date().toISOString().split('T')[0]; // Tämän päivän päivämäärä (YYYY-MM-DD)
  const [storedMovie, setStoredMovie] = useLocalStorage('sceneMovie', { date: "", movie: null });

  useEffect(() => {
    // Jos tallennettu elokuva on tältä päivältä, käytetään sitä
    if (storedMovie.date === today && storedMovie.movie) {
      return;
    }

    // Muuten haetaan uusi elokuva
    async function getMovie() {
      const randomMovie = await fetchMovie(sceneData.api_key);
      if (randomMovie) {
        setStoredMovie({ date: today, movie: randomMovie }); // Tallennetaan elokuva localStorageen
      }
    }

    getMovie();
  }, [sceneData?.api_key, storedMovie, setStoredMovie]); // Päivitetään vain tarvittaessa

  if (!storedMovie.movie) return <p>Ladataan elokuvaa...</p>;

  return (
    <div className="scene-movie">
      <div className="movie-info">
        <div className="movie-name">
          <h1>{storedMovie.movie.title}</h1>
        </div>
        <p>{storedMovie.movie.overview}</p>
      </div>

      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${storedMovie.movie.poster_path}`} alt={storedMovie.movie.title} />
      </div>

      <footer className="tmdb-attribution">
        <p>Tämä sovellus käyttää TMDB APIa, mutta se ei ole TMDB:n hyväksymä, sertifioima tai sponsoroima.</p>
        <img src="/images/tmdb-logo.svg" alt="TMDB Logo" />
      </footer>
    </div>
  );
}

export default SceneMovie;

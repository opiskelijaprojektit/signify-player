import { useEffect } from 'react';
import './Movie.css';
import { fetchMovie } from './fetchMovie';
import useLocalStorage from '../../utils/useLocalStorage';
import Container from '../../components/container/Container';
import background from './background.jpg';
import logo from './tmdb-logo.svg';

/**
 * A movie component that fetches popular movies data from
 * TMDB and selects randomly one. Movie data is stored to
 * localStorage and view is generated.
 *
 * @component
 * @author Mira Salonen
 */
function SceneMovie({ data }) {
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
      const randomMovie = await fetchMovie(data.api_key);
      if (randomMovie) {
        setStoredMovie({ date: today, movie: randomMovie }); // Tallennetaan elokuva localStorageen
      }
    }

    getMovie();
  }, [data?.api_key, storedMovie, setStoredMovie]); // Päivitetään vain tarvittaessa

  if (!storedMovie.movie) return <p>Ladataan elokuvaa...</p>;

  return (
    <Container className="scene-movie" backgroundImage={background}>

      <div className="movie-header">
        <h2>Movie of the Day</h2>
      </div>
      
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
        <img src={logo} alt="TMDB Logo" />
        <p>This application uses the TMDB API but is not endorsed, certified, or otherwise approved by TMDB.</p>
      </footer>
    </Container>
  );
}

export default SceneMovie;
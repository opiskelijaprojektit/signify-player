import { useEffect, useState } from 'react';
import './Scene-movie.css';
import { fetchMovie } from '../../utils/fetchMovie';

function SceneMovie({ sceneData }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovie() {
      const randomMovie = await fetchMovie(sceneData.api_key);
      setMovie(randomMovie);
    }

    getMovie();
  }, [sceneData?.api_key]);

  if (!movie) return <p>Ladataan elokuvaa...</p>;

  return (
    <div className="scene-movie">
      <div className="movie-info">
        <div className="movie-name">
          <h1>{movie.title}</h1>
        </div>
        <p>{movie.overview}</p>
      </div>

      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>

      <footer className="tmdb-attribution">
        <p>Tämä sovellus käyttää TMDB APIa, mutta se ei ole TMDB:n hyväksymä, sertifioima tai sponsoroima.</p>
        <img src="/images/tmdb-logo.svg" alt="TMDB Logo" />
      </footer>
    </div>
  );
}

export default SceneMovie;

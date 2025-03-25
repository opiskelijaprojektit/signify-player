/**
 * Get the most popular films from TMDB and select
 * one at random.
 *
 * @param   {string} apiKey
 *          TMDB API key.
 *
 * @author Mira Salonen
 */
export async function fetchMovie(apiKey) {
    if (!apiKey) {
      console.error("API key is missing!");
      return null;
    }
  
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=1`);
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        // Valitaan satunnainen elokuva tuloksista
        return data.results[Math.floor(Math.random() * data.results.length)];
      } else {
        console.error("No movies found from TMDB API!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
      return null;
    }
  }
  
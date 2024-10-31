
export const  fetchMovies = async (query: string,  page: number = 1) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await res.json();
    return data; 
  }
  




export const fetchSuggestions = async (query: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;  
    const res = await fetch(
      `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    
    if (!res.ok) {
      throw new Error("Failed to fetch suggestions");
    }
  
    const data = await res.json();
    return data.results; 
  };
  
import { MovieType } from "./movieType"

export type MovieResponseType  = {
    results: MovieType[],
    total_pages: number,
    total_results: number,
  }
  
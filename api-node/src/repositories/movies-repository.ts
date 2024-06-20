import { Movie, UserMovieRating } from '@prisma/client'


export interface MoviesRepository {
    findById(movieId: string): Promise<{ user_movie_rating: UserMovieRating[] } & Movie | null>
    updateRating(movieId: string, newRating: number): Promise<{ user_movie_rating: UserMovieRating[] } & Movie>
}
import { UsersRepository } from '@/repositories/users-repository'
import { UserMovieRatingAlreadyExistsError } from '../errors/user-movie-rating-already-exists-error'
import { MoviesRepository } from '@/repositories/movies-repository'
import { MovieNotFound } from '../errors/movie-not-found-error'

interface CreateUserMovieRatingRequest {
    userId: string
    movieId: string
    rating: number
}

export class CreateUserMovieRatingUseCase {
    constructor(private usersRepository: UsersRepository, private moviesRepository: MoviesRepository) {}

    async handle({userId, movieId, rating}: CreateUserMovieRatingRequest) {
        const userMovieRatingExists = await this.usersRepository.findUserMovieRatingById(userId, movieId)

        if (userMovieRatingExists) {
            throw new UserMovieRatingAlreadyExistsError()
        }

        const movieExists = await this.moviesRepository.findById(movieId)

        if (!movieExists) {
            throw new MovieNotFound()
        }

        const newAverage = ((movieExists.rating * movieExists.user_movie_rating.length) + rating) / (movieExists.user_movie_rating.length + 1)

        await this.moviesRepository.updateRating(movieId, newAverage)

        const user = await this.usersRepository.createUserMovieRating(userId, movieId, rating)
        
        return user
    }
}
import { prisma } from '@/lib/prisma'
import { MoviesRepository } from '../movies-repository'

export class PrismaMoviesRepository implements MoviesRepository {
    async findById(movieId: string) {
        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId
            },
            include: {
                user_movie_rating: true
            }
        })

        return movie
    }

    async updateRating(movieId: string, newRating: number) {
        const movie = await prisma.movie.update({
            where: {
                id: movieId
            },
            data: {
                rating: newRating
            },
            include: {
                user_movie_rating: true
            }
        })

        return movie
    }
}
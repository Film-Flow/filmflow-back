import { PrismaMoviesRepository } from '@/repositories/prisma/prisma-movies-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { MovieNotFound } from '@/use-case/errors/movie-not-found-error'
import { UserMovieRatingAlreadyExistsError } from '@/use-case/errors/user-movie-rating-already-exists-error'
import { CreateUserMovieRatingUseCase } from '@/use-case/users/create-user-movie-rating-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateUserMovieRating(request: FastifyRequest, reply: FastifyReply) {
    const createUserMovieRatingBodySchema = z.object({
        movieId: z.string(),
        rating: z.number().min(0).max(5),
        userId: z.string()
    })

    const { movieId, rating, userId } = createUserMovieRatingBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const prismaMoviesRepository = new PrismaMoviesRepository()
        const createUserMovieRatingUseCase = new CreateUserMovieRatingUseCase(prismaUsersRepository, prismaMoviesRepository)

        const userMovieRating = await createUserMovieRatingUseCase.handle({userId, movieId, rating})

        return reply.status(201).send(userMovieRating)
    } catch (error) {
        if (error instanceof UserMovieRatingAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }

        if (error instanceof MovieNotFound) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}
import { FastifyInstance } from 'fastify'
import { register } from './register-controller'
import { login } from './login-controller'
import { CreateUserMovieRating } from './create-user-movie-rating-controller'


export async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/register', register)
    fastify.post('/login', login)
    fastify.post('/user-movie-rating', CreateUserMovieRating)
}
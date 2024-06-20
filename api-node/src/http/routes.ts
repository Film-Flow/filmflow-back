import { FastifyInstance } from 'fastify'
import { userRoutes } from './user/routes'

export async function routes(fastify: FastifyInstance) {
    fastify.register(userRoutes)
}
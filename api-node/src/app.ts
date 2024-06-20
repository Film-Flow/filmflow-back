import fastify from 'fastify'
import { ZodError } from 'zod'
import { routes } from './http/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(routes)

app.setErrorHandler((error, req, reply) => {
    if (error instanceof ZodError) {
        reply.status(409).send({ message: error.format()})
    }
})
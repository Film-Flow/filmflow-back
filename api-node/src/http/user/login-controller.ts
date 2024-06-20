import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { InvalidCredentialsError } from '@/use-case/errors/invalid-credentials'
import { UserNotFound } from '@/use-case/errors/user-not-found-error'
import { LoginUseCase } from '@/use-case/users/login-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function login(request: FastifyRequest, reply: FastifyReply) {
    const loginBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = loginBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const loginUseCase = new LoginUseCase(prismaUsersRepository)

        const user = await loginUseCase.handle({ email, password })

        const token = await reply.jwtSign(
            {}, 
            {
                sign: {
                    sub: user.id
                }
            }
        )

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password_hash, ...userWithoutPassword } = user

        return reply.status(200).send({ 
            userWithoutPassword,
            token 
        })
    } catch (error) {
        if (error instanceof UserNotFound) {
            return reply.status(404).send({ message: error.message })
        }

        if (error instanceof InvalidCredentialsError) {
            return reply.status(401).send({ message: error.message })
        }

        throw error
    }
}
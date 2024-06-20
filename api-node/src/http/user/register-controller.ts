import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-case/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-case/users/register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'


export async function register(req: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        nickname: z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8),
    })

    const { name, nickname, email, password } = registerBodySchema.parse(req.body)

    try {
        const prismaUserRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUserRepository)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password_hash, ...userWithoutPassword } = await registerUseCase.handle({
            name,
            nickname: nickname || null,
            email,
            password,
        })

        return reply.status(201).send(userWithoutPassword)
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            console.log(error)
            return reply.status(409).send({message: error.message})
        }

        throw error
    }
}
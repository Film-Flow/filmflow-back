import { UserLoginRequest } from '@/@types/users-interfaces'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFound } from '../errors/user-not-found-error'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials'

export class LoginUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async handle({ email, password }: UserLoginRequest) {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new UserNotFound()
        }

        const isPasswordCorrectlyHashed = await compare(password, user.password_hash)

        if (!isPasswordCorrectlyHashed) {
            throw new InvalidCredentialsError()
        }

        return user
    }
}
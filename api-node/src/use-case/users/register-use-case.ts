import { UsersRepository } from '@/repositories/users-repository'
import { UserRegisterRequest } from '@/@types/users-interfaces'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { hash } from 'bcryptjs'

export class RegisterUseCase {
    constructor (private usersRepository: UsersRepository) {}

    async handle ({
        name,
        nickname,
        email,
        password,
    }: UserRegisterRequest){

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        let userWithSameNickname = null

        if (nickname) {
            userWithSameNickname = await this.usersRepository.findByNickname(nickname)

            if (userWithSameNickname) {
                throw new UserAlreadyExistsError()
            }
        }

        if (userWithSameNickname) {
            throw new UserAlreadyExistsError()
        }

        const passwordHash = await hash(password, 6)

        const user = await this.usersRepository.create({
            name,
            nickname,
            email,
            password: passwordHash,
        })

        return user
    }
}

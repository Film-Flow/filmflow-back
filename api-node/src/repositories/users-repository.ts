import { UserRegisterRequest } from '@/@types/users-interfaces'
import { User, UserMovieRating } from '@prisma/client'

export interface UsersRepository {
    create(data: UserRegisterRequest): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findByNickname(nickname: string): Promise<User | null>
    findUserMovieRatingById(userId: string, movieId: string): Promise<UserMovieRating | null>
    createUserMovieRating(userId: string, movieId: string, rating: number): Promise<UserMovieRating>
    // findById(id: string): Promise<User | null>
    // update(data: UserUpdateRequest): Promise<User>
    // delete(id: string): Promise<void>
}
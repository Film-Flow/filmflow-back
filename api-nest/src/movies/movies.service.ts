import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class MoviesService {
    constructor(private prismaService: PrismaService) {}

    async create(createMovieDto) {
        const movie = await this.prismaService.movie.create({
            data: {
                title: createMovieDto.title,
                release_year: createMovieDto.release_date,
                genres: createMovieDto.genre,
                description: createMovieDto.description,
                popularity: createMovieDto.popularity,
                image_url: createMovieDto.image_url,
                runtime: createMovieDto.runtime,
            },
        })

        return movie
    }
}

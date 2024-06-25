import { Test, TestingModule } from '@nestjs/testing'
import { MoviesService } from './movies.service'

describe('Movies service', () => {
    let service: MoviesService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MoviesService,
                {
                    provide: MoviesService,
                    useValue: {
                        movie: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                        },
                    },
                },
            ],
        }).compile()

        service = module.get<MoviesService>(MoviesService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})

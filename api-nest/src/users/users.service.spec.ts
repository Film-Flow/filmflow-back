import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'

describe('Users service', () => {
    let service: UsersService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: UsersService,
                    useValue: {
                        user: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                        },
                    },
                },
            ],
        }).compile()

        service = module.get<UsersService>(UsersService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { EnvService } from './env/env.service'
import { UsersModule } from './users/users.module'
import { PrismaModule } from './prisma/prisma.module'
import { MoviesModule } from './movies/movies.module'

@Module({
    controllers: [],
    providers: [EnvService],
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        UsersModule,
        PrismaModule,
        MoviesModule,
    ],
})
export class AppModule {}

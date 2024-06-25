import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import console from 'console'
import { randomUUID } from 'crypto'
import { afterAll, beforeAll } from 'vitest'

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error(
            'No DATABASE_URL provided. Please set the DATABASE_URL environment variable.',
        )
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schemaId)

    return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
    const databaseURL = generateUniqueDatabaseURL(schemaId)

    process.env.DATABASE_URL = databaseURL

    console.log(databaseURL)

    execSync('npx prisma migrate deploy')
})

afterAll(async () => {
    await prisma.$executeRawUnsafe(
        `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`,
    )
    await prisma.$disconnect()
})

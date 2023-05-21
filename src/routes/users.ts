import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return users
  })

  app.get('/users/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
    })

    return user
  })

  app.post('/users', async (request) => {
    const bodySchema = z.object({
      githubId: z.number(),
      name: z.string(),
      login: z.string(),
      avatarUrl: z.string(),
    })

    const { githubId, name, login, avatarUrl } = bodySchema.parse(request.body)

    const user = await prisma.user.create({
      data: {
        githubId,
        name,
        login,
        avatarUrl,
      },
    })

    return user
  })

  app.put('/users/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      githubId: z.number(),
      name: z.string(),
      login: z.string(),
      avatarUrl: z.string(),
    })

    const { githubId, name, login, avatarUrl } = bodySchema.parse(request.body)

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        githubId,
        name,
        login,
        avatarUrl,
      },
    })

    return user
  })

  app.delete('/users/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.user.delete({
      where: { id },
    })
  })
}

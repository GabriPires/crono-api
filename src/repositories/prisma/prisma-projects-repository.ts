import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { ProjectsRepository } from '../projects-repository'

export class PrismaProjectsRepository implements ProjectsRepository {
  async create(data: Prisma.ProjectUncheckedCreateInput) {
    const project = await prisma.project.create({
      data,
    })

    return project
  }
}

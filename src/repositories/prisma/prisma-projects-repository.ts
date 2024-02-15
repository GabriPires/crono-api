import { Prisma, Project } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { ProjectsRepository } from '../projects-repository'

export class PrismaProjectsRepository implements ProjectsRepository {
  async findById(id: string): Promise<Project | null> {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    })

    return project
  }

  async create(data: Prisma.ProjectUncheckedCreateInput) {
    const project = await prisma.project.create({
      data,
    })

    return project
  }
}

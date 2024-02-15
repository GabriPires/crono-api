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

  async findManyByUserId(userId: string): Promise<Project[]> {
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
    })

    return projects
  }

  async create(data: Prisma.ProjectUncheckedCreateInput) {
    const project = await prisma.project.create({
      data,
    })

    return project
  }
}

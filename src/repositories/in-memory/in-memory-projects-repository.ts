import { randomUUID } from 'node:crypto'

import { Prisma, Project } from '@prisma/client'

import { ProjectsRepository } from '../projects-repository'

export class InMemoryProjectsRepository implements ProjectsRepository {
  public projects: Project[] = []

  async create(data: Prisma.ProjectUncheckedCreateInput) {
    const project = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      userId: data.userId,
      createdAt: new Date(),
    }

    this.projects.push(project)

    return project
  }

  async findById(id: string) {
    const project = this.projects.find((project) => project.id === id)

    if (!project) {
      return null
    }

    return project
  }
}

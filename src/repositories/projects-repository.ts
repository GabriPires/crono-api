import { Prisma, Project } from '@prisma/client'

export interface ProjectsRepository {
  create(data: Prisma.ProjectUncheckedCreateInput): Promise<Project>
}
import { Prisma, Project } from '@prisma/client'

export interface ProjectsRepository {
  create(project: Prisma.ProjectUncheckedCreateInput): Promise<Project>
}

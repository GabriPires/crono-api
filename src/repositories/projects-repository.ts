import { Prisma, Project } from '@prisma/client'

export type FindManyByUserIdParams = {
  isArchived: boolean
}

export interface ProjectsRepository {
  create(data: Prisma.ProjectUncheckedCreateInput): Promise<Project>
  findById(id: string): Promise<Project | null>
  findManyByUserId(
    userId: string,
    params?: FindManyByUserIdParams | undefined,
  ): Promise<Project[]>
}

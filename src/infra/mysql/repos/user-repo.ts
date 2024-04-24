import {
  CreateUserRepository,
  User,
  UserFindByEmailRepository,
} from '@/domain/contracts/repos/user-repo'
import prisma from '@/infra/mysql/prisma-client'

export class MySqlUserRepository implements UserFindByEmailRepository, CreateUserRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    const pgUser = await prisma.users.findFirst({ where: { email } })
    if (pgUser !== null) {
      return {
        name: pgUser.name,
        email: pgUser.email,
        hashedPassword: pgUser.password,
      }
    }
  }

  async create(input: CreateUserRepository.Input): Promise<void> {
    await prisma.users.create({
      data: {
        name: input.name,
        email: input.email,
        password: input.hashedPassword,
      },
    })
  }
}

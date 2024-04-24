export type User = {
  name: string
  email: string
  hashedPassword: string
}

export interface UserFindByEmailRepository {
  findByEmail: (email: string) => Promise<User | undefined>
}

export interface CreateUserRepository {
  create: (
    input: CreateUserRepository.Input
  ) => Promise<void>
}

export namespace CreateUserRepository {
  export type Input = {
    name: string
    email: string
    hashedPassword: string
  }
}

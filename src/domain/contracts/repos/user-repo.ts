export type User = {
  name: string
  email: string
  hashedPassword: string
}

export interface UserFindByEmailRepository {
  findByEmail: (email: string) => Promise<User | undefined>
}

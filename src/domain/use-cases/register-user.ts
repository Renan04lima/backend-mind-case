import { Encrypter } from '@/domain/contracts/gateways/encrypter'
import { HashComparer, Hasher } from '@/domain/contracts/gateways/hash'
import {
  CreateUserRepository,
  UserFindByEmailRepository,
} from '@/domain/contracts/repos/user-repo'

type Input = {
  name: string
  email: string
  password: string
}
type Output =
  | {
      user: {
        email: string
        name: string
      }
      token: string
    }
  | undefined

export type RegisterUser = (input: Input) => Promise<Output>

export type Setup = (
  userRepo: UserFindByEmailRepository & CreateUserRepository,
  hasher: Hasher,
  encrypter: Encrypter
) => RegisterUser

export const setupRegisterUser: Setup =
  (userRepo, hasher, encrypter) =>
  async ({ name, email, password }) => {
    const userAlreadyExists = await userRepo.findByEmail(email)
    if (userAlreadyExists) return undefined

    const hashedPassword = await hasher.hash(password)

    await userRepo.create({
      name,
      email,
      hashedPassword,
    })

    const token = await encrypter.encrypt(email)

    return {
      user: {
        email,
        name,
      },
      token,
    }
  }

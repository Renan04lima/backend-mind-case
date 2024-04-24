import { Encrypter } from '@/domain/contracts/gateways/encrypter'
import { HashComparer } from '@/domain/contracts/gateways/hash'
import { UserFindByEmailRepository } from '@/domain/contracts/repos/user-repo'

type Input = {
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

export type Authentication = (input: Input) => Promise<Output>

export type Setup = (
  userRepo: UserFindByEmailRepository,
  hashComparer: HashComparer,
  encrypter: Encrypter
) => Authentication

export const setupAuthentication: Setup =
  (userRepo, hashComparer, encrypter) =>
  async ({ email, password }) => {
    const user = await userRepo.findByEmail(email)
    if (user === undefined) return undefined

    const isValid = await hashComparer.compare(password, user.hashedPassword)
    if (!isValid) return undefined

    const token = await encrypter.encrypt(user.email)

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    }
  }

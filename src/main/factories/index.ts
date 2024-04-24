import { ListProductsController } from '@/application/controllers/list-products'
import { RegisterProductController } from '@/application/controllers/register-product'
import { DeleteProductController } from '@/application/controllers/delete-product'
import { setupRegisterProduct } from '@/domain/use-cases/register-product'
import { MySqlProductRepository } from '@/infra/mysql/repos/product-repo'
import { UpdateProductController } from '@/application/controllers/update-product'
import { BcryptAdapter } from '@/infra/gateways/bcrypt-adapter'
import { JwtAdapter } from '@/infra/gateways/jwt-adapter'
import { LoginController } from '@/application/controllers/login'
import { setupAuthentication } from '@/domain/use-cases/authentication'
import { MySqlUserRepository } from '@/infra/mysql/repos/user-repo'
import { RegisterUserController } from '@/application/controllers/register-user'
import { setupRegisterUser } from '@/domain/use-cases/register-user'

const makeMySqlProductRepository = () => {
  return new MySqlProductRepository()
}

export const makeRegisterProductController = () => {
  return new RegisterProductController(
    setupRegisterProduct(makeMySqlProductRepository())
  )
}

export const makeListProductsController = () => {
  const productRepo = makeMySqlProductRepository()

  return new ListProductsController(productRepo.list.bind(productRepo))
}

export const makeDeleteProductController = () => {
  const productRepo = makeMySqlProductRepository()

  return new DeleteProductController(productRepo.delete.bind(productRepo))
}

export const makeUpdateProductController = () => {
  const productRepo = makeMySqlProductRepository()

  return new UpdateProductController(productRepo.update.bind(productRepo))
}

export const makeLoginController = () => {
  return new LoginController(
    setupAuthentication(
      new MySqlUserRepository(),
      new BcryptAdapter(12),
      new JwtAdapter(process.env.JWT_SECRET || 'JWT_SECRET')
    )
  )
}

export const makeRegisterUserController = () => {
  return new RegisterUserController(
    setupRegisterUser(
      new MySqlUserRepository(),
      new BcryptAdapter(12),
      new JwtAdapter(process.env.JWT_SECRET || 'JWT_SECRET')
    )
  )
}

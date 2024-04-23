import { RegisterProductController } from '@/application/controllers/register-product'
import { setupRegisterProduct } from '@/domain/use-cases/register-product'
import { MySqlProductRepository } from '@/infra/mysql/repos/product-repo'

export const makeRegisterProductController = () => {
  return new RegisterProductController(
    setupRegisterProduct(new MySqlProductRepository())
  )
}

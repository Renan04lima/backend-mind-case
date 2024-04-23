import { ListProductsController } from '@/application/controllers/list-products'
import { RegisterProductController } from '@/application/controllers/register-product'
import { setupRegisterProduct } from '@/domain/use-cases/register-product'
import { MySqlProductRepository } from '@/infra/mysql/repos/product-repo'

export const makeRegisterProductController = () => {
  return new RegisterProductController(
    setupRegisterProduct(new MySqlProductRepository())
  )
}

export const makeListProductsController = () => {
  return new ListProductsController(
    new MySqlProductRepository().list.bind(new MySqlProductRepository())
  )
}

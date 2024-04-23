import { ListProductsController } from '@/application/controllers/list-products'
import { RegisterProductController } from '@/application/controllers/register-product'
import { DeleteProductController } from '@/application/controllers/delete-product'
import { setupRegisterProduct } from '@/domain/use-cases/register-product'
import { MySqlProductRepository } from '@/infra/mysql/repos/product-repo'
import { UpdateProductController } from '@/application/controllers/update-product'

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

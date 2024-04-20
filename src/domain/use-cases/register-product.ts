import { CreateProductRepository } from '@/domain/contracts/repos/product-repo'

type Input = {
  name: string
  description: string
  image?: Buffer
  price: number
  quantity_stock: number
}

type Setup = (productRepo: CreateProductRepository) => RegisterProduct
type RegisterProduct = (input: Input) => Promise<void>

export const setupRegisterProduct: Setup = (productRepo) => async (input) => {
  await productRepo.create(input)
}

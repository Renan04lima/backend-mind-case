import { CreateProductRepository } from '@/domain/contracts/repos/product-repo'

type Input = {
  name: string
  description: string
  image: Buffer | null
  price: number
  quantityStock: number
}

type Output = {
  id: number
  name: string
  description: string
  image: Buffer | null
  price: number
  quantityStock: number
}

type Setup = (productRepo: CreateProductRepository) => RegisterProduct
export type RegisterProduct = (input: Input) => Promise<Output>

export const setupRegisterProduct: Setup = (productRepo) => async (input) => {
  return await productRepo.create(input)
}

export interface CreateProductRepository {
  create: (
    input: CreateProductRepository.Input
  ) => Promise<CreateProductRepository.Output>
}

export namespace CreateProductRepository {
  export type Input = {
    name: string
    description: string
    image: Buffer | null
    price: number
    quantityStock: number
  }
  export type Output = {
    id: number
    name: string
    description: string
    image: Buffer | null
    price: number
    quantityStock: number
  }
}

export interface CreateProductRepository {
  create: (
    input: CreateProductRepository.Input
  ) => Promise<CreateProductRepository.Output>
}

export namespace CreateProductRepository {
  export type Input = {
    name: string
    description: string
    image?: {
      buffer: Buffer
      mimetype: string
    }
    price: number
    quantityStock: number
  }
  export type Output = {
    id: number
    name: string
    description: string
    image?: {
      buffer: Buffer
      mimetype: string
    }
    price: number
    quantityStock: number
  }
}

export interface ListProductsRepository {
  list: (
    input: ListProductsRepository.Input
  ) => Promise<ListProductsRepository.Output>
}

export namespace ListProductsRepository {
  export type Input = {}
  export type Output = {
    id: number
    name: string
    description: string
    image?: {
      buffer: Buffer
      mimetype: string
    }
    price: number
    quantityStock: number
  }[]
}

export interface DeleteProductsRepository {
  delete: (input: DeleteProductsRepository.Input) => Promise<void>
}

export namespace DeleteProductsRepository {
  export type Input = {
    id: number
  }
}

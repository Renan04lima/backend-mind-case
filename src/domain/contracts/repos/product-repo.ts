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

export interface UpdateProductsRepository {
  update: (
    input: UpdateProductsRepository.Input
  ) => Promise<UpdateProductsRepository.Output>
}

export namespace UpdateProductsRepository {
  export type Input = {
    id: number
    name?: string
    description?: string
    image?: {
      buffer: Buffer
      mimetype: string
    }
    price?: number
    quantityStock?: number
  }

  export type Output =
    | {
        id: number
        name: string
        description: string
        price: number
        quantityStock: number
        image?: {
          buffer: Buffer
          mimetype: string
        }
      }
    | undefined
}

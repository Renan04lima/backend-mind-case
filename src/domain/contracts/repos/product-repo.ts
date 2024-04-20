type ProductData = {
  name: string
  description: string
  image?: Buffer
  price: number
  quantity_stock: number
}

export interface CreateProductRepository {
  create: (product: ProductData) => Promise<void>
}

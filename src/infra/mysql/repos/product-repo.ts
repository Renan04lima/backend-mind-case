import { CreateProductRepository } from '@/domain/contracts/repos/product-repo'
import prisma from '@/infra/mysql/prisma-client'

export class MySqlProductRepository implements CreateProductRepository {
  async create(
    input: CreateProductRepository.Input
  ): Promise<CreateProductRepository.Output> {
    const product = await prisma.products.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        quantityStock: input.quantityStock,
        imageBuffer: input?.image?.buffer,
        imageType: input?.image?.mimetype,
      },
    })
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantityStock: product.quantityStock,
      image: product.imageBuffer && product.imageType
        ? {
            buffer: product.imageBuffer,
            mimetype: product.imageType,
          }
        : undefined,
    }
  }
}

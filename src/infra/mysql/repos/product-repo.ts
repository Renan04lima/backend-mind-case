import {
  CreateProductRepository,
  DeleteProductsRepository,
  ListProductsRepository,
} from '@/domain/contracts/repos/product-repo'
import prisma from '@/infra/mysql/prisma-client'

export class MySqlProductRepository
  implements
    CreateProductRepository,
    ListProductsRepository,
    DeleteProductsRepository
{
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
      image:
        product.imageBuffer && product.imageType
          ? {
              buffer: product.imageBuffer,
              mimetype: product.imageType,
            }
          : undefined,
    }
  }

  async list(): Promise<ListProductsRepository.Output> {
    const products = await prisma.products.findMany()
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantityStock: product.quantityStock,
      image:
        product.imageBuffer && product.imageType
          ? {
              buffer: product.imageBuffer,
              mimetype: product.imageType,
            }
          : undefined,
    }))
  }

  async delete({ id }: DeleteProductsRepository.Input): Promise<void> {
    await prisma.products.delete({
      where: {
        id,
      },
    })
  }
}

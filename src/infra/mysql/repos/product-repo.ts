import {
  CreateProductRepository,
  DeleteProductsRepository,
  ListProductsRepository,
  UpdateProductsRepository,
} from '@/domain/contracts/repos/product-repo'
import prisma from '@/infra/mysql/prisma-client'

export class MySqlProductRepository
  implements
    CreateProductRepository,
    ListProductsRepository,
    DeleteProductsRepository,
    UpdateProductsRepository
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

  async update({
    id,
    ...input
  }: UpdateProductsRepository.Input): Promise<UpdateProductsRepository.Output> {
    const exists = await prisma.products.findFirst({
      where: {
        id,
      },
    })
    if (!exists) return undefined
    const productUpdated = await prisma.products.update({
      where: {
        id,
      },
      data: {
        name: input.name || exists.name,
        description: input.description || exists.description,
        price: input.price || exists.price,
        quantityStock: input.quantityStock || exists.quantityStock,
        imageBuffer: input?.image?.buffer || exists.imageBuffer,
        imageType: input?.image?.mimetype || exists.imageType,
      },
    })

    return {
      id: productUpdated.id,
      name: productUpdated.name,
      description: productUpdated.description,
      price: productUpdated.price,
      quantityStock: productUpdated.quantityStock,
      image:
        productUpdated.imageBuffer && productUpdated.imageType
          ? {
              buffer: productUpdated.imageBuffer,
              mimetype: productUpdated.imageType,
            }
          : undefined,
    }
  }
}

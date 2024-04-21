import { CreateProductRepository } from '@/domain/contracts/repos/product-repo'
import prisma from '@/infra/mysql/prisma-client'

export class MySqlProductRepository implements CreateProductRepository {
  async create(
    input: CreateProductRepository.Input
  ): Promise<CreateProductRepository.Output> {
    return await prisma.products.create({
      data: input,
    })
  }
}
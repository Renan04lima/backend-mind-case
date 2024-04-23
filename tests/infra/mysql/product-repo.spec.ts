import {
  CreateProductRepository,
  DeleteProductsRepository,
  ListProductsRepository,
} from '@/domain/contracts/repos/product-repo'
import { MySqlProductRepository } from '@/infra/mysql/repos/product-repo'
import { prismaMock } from './singleton'

describe('MySqlProductRepository', () => {
  describe('create', () => {
    let sut: CreateProductRepository
    const productResolved: CreateProductRepository.Output = {
      id: 1,
      name: 'valid_name',
      description: 'valid_description',
      price: 10,
      quantityStock: 10,
      image: {
        buffer: Buffer.from('any_image'),
        mimetype: 'image/png',
      },
    }

    beforeEach(() => {
      sut = new MySqlProductRepository()
      prismaMock.products.create.mockResolvedValue({
        id: 1,
        name: 'valid_name',
        description: 'valid_description',
        price: 10,
        quantityStock: 10,
        imageBuffer: Buffer.from('any_image'),
        imageType: 'image/png',
      })
    })

    it('should create a new product', async () => {
      const product = await sut.create({
        name: 'valid_name',
        description: 'valid_description',
        price: 10,
        quantityStock: 10,
        image: {
          buffer: Buffer.from('any_image'),
          mimetype: 'image/png',
        },
      })

      expect(product).toEqual(productResolved)
    })
  })

  describe('list', () => {
    let sut: ListProductsRepository
    const productsResolved: ListProductsRepository.Output = [
      {
        id: 1,
        name: 'valid_name',
        description: 'valid_description',
        price: 10,
        quantityStock: 10,
        image: {
          buffer: Buffer.from('any_image'),
          mimetype: 'image/png',
        },
      },
    ]

    beforeEach(() => {
      sut = new MySqlProductRepository()
      prismaMock.products.findMany.mockResolvedValue([
        {
          id: 1,
          name: 'valid_name',
          description: 'valid_description',
          price: 10,
          quantityStock: 10,
          imageBuffer: Buffer.from('any_image'),
          imageType: 'image/png',
        },
      ])
    })

    it('should list products', async () => {
      const products = await sut.list({})

      expect(products).toEqual(productsResolved)
      expect(products).toHaveLength(1)
    })
  })

  describe('delete', () => {
    let sut: DeleteProductsRepository

    beforeEach(() => {
      sut = new MySqlProductRepository()
      prismaMock.products.delete.mockResolvedValue({
        id: 1,
        name: 'valid_name',
        description: 'valid_description',
        price: 10,
        quantityStock: 10,
        imageBuffer: Buffer.from('any_image'),
        imageType: 'image/png',
      })
    })

    it('should delete product', async () => {
      const product = await sut.delete({ id: 1 })

      expect(product).toBeUndefined()
    })
  })
})

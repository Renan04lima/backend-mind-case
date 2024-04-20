import { mock } from 'jest-mock-extended'

type Input = {
  name: string
  description: string
  image?: Buffer
  price: number
  quantity_stock: number
}

type ProductData = {
  name: string
  description: string
  image?: Buffer
  price: number
  quantity_stock: number
}

interface CreateProductRepository {
  create: (product: ProductData) => Promise<void>
}

type Setup = (productRepo: CreateProductRepository) => RegisterProduct
type RegisterProduct = (input: Input) => Promise<void>

const setupRegisterProduct: Setup = (productRepo) => async (input) => {
  await productRepo.create(input)
}

describe('RegisterProduct UseCase', () => {
  it('should call CreateProductRepository with correct params', async () => {
    const productRepoSpy = mock<CreateProductRepository>()
    productRepoSpy.create.mockResolvedValueOnce()
    const sut = setupRegisterProduct(productRepoSpy)

    await sut({
      name: 'valid_name',
      description: 'valid_description',
      price: 10,
      quantity_stock: 10,
      image: Buffer.from('any_image'),
    })

    expect(productRepoSpy.create).toHaveBeenCalledWith({
      name: 'valid_name',
      description: 'valid_description',
      price: 10,
      quantity_stock: 10,
      image: Buffer.from('any_image'),
    })
    expect(productRepoSpy.create).toHaveBeenCalledTimes(1)
  })
})

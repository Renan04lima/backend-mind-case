import { MockProxy, mock } from 'jest-mock-extended'
import { setupRegisterProduct } from '@/domain/use-cases/register-product'
import { CreateProductRepository } from '@/domain/contracts/repos/product-repo'

describe('RegisterProduct UseCase', () => {
  let productRepoSpy: MockProxy<CreateProductRepository>
  let sut: jest.Func
  const productInput = {
    name: 'valid_name',
    description: 'valid_description',
    price: 10,
    quantityStock: 10,
    image: Buffer.from('any_image'),
  }

  beforeAll(() => {
    productRepoSpy = mock()
    productRepoSpy.create.mockResolvedValue({
      id: 1,
      name: 'valid_name',
      description: 'valid_description',
      price: 10,
      quantityStock: 10,
      image: Buffer.from('any_image'),
    })
  })

  beforeEach(() => {
    sut = setupRegisterProduct(productRepoSpy)
  })

  it('should call CreateProductRepository with correct params', async () => {
    await sut(productInput)

    expect(productRepoSpy.create).toHaveBeenCalledWith({
      name: 'valid_name',
      description: 'valid_description',
      price: 10,
      quantityStock: 10,
      image: Buffer.from('any_image'),
    })
    expect(productRepoSpy.create).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if CreateProductRepository throws', async () => {
    productRepoSpy.create.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut(productInput)

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return product on success', async () => {
    const product = await sut(productInput)

    expect(product).toEqual({
      id: 1,
      name: 'valid_name',
      description: 'valid_description',
      price: 10,
      quantityStock: 10,
      image: Buffer.from('any_image'),
    })
  })
})

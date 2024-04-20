import { MockProxy, mock } from 'jest-mock-extended'
import { setupRegisterProduct } from '@/domain/use-cases/register-product'
import { CreateProductRepository } from '@/domain/contracts/repos/product-repo'

describe('RegisterProduct UseCase', () => {
  let productRepoSpy: MockProxy<CreateProductRepository>
  let sut: jest.Func

  beforeAll(() => {
    productRepoSpy = mock()
    productRepoSpy.create.mockResolvedValue()
  })

  beforeEach(() => {
    sut = setupRegisterProduct(productRepoSpy)
  })

  it('should call CreateProductRepository with correct params', async () => {
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

  it('should rethrow if CreateProductRepository throws', async () => {
    productRepoSpy.create.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({
      name: 'valid_name',
      description: 'valid_description',
      price: 10,
      quantity_stock: 10,
      image: Buffer.from('any_image'),
    })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})

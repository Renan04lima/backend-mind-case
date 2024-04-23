import { HttpResponse, ok } from '@/application/helpers/http'
import { Controller } from '@/application/controllers/controller'
import { ListProducts } from '@/domain/use-cases/list-products'

import * as yup from 'yup'

type HttpRequest = {}
type Model =
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
    }[]
  | Error

export class ListProductsController extends Controller {
  constructor(private readonly list: ListProducts) {
    super()
  }

  async execute(req: HttpRequest): Promise<HttpResponse<Model>> {
    const products = await this.list(req)
    return ok(products)
  }

  getValidationSchema(): yup.Schema<any> {
    return yup.object().optional()
  }
}

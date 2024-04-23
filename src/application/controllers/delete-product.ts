import { HttpResponse, noContent } from '@/application/helpers/http'
import { Controller } from '@/application/controllers/controller'
import { DeleteProduct } from '@/domain/use-cases/delete-products'

import * as yup from 'yup'

type HttpRequest = {
  id: number
}
type Model = undefined | Error

export class DeleteProductController extends Controller {
  constructor(private readonly deleteProduct: DeleteProduct) {
    super()
  }

  async execute(req: HttpRequest): Promise<HttpResponse<Model>> {
    await this.deleteProduct({
      id: Number(req.id),
    })
    return noContent()
  }

  getValidationSchema(): yup.Schema<any> {
    return yup
      .object()
      .shape({
        id: yup.number().integer().required(),
      })
      .optional()
  }
}

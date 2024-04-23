import { HttpResponse, created } from '@/application/helpers/http'
import { Controller } from '@/application/controllers/controller'
import { RegisterProduct } from '@/domain/use-cases/register-product'

import * as yup from 'yup'

type HttpRequest = {
  name: string
  description: string
  price: number
  quantityStock: number
  file?: { buffer: Buffer; mimetype: string }
}
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
    }
  | Error

export class RegisterProductController extends Controller {
  constructor(private readonly register: RegisterProduct) {
    super()
  }

  async execute(req: HttpRequest): Promise<HttpResponse<Model>> {
    const product = await this.register({
      name: req.name,
      description: req.description,
      price: Number(req.price),
      quantityStock: Number(req.quantityStock),
      image: req.file?.buffer
        ? { buffer: req.file.buffer, mimetype: req.file.mimetype }
        : undefined,
    })
    return created(product)
  }

  getValidationSchema(): yup.Schema<any> {
    const imageMimeTypes = ['image/jpeg', 'image/png']
    return yup.object().shape({
      name: yup.string().max(128).required(),
      description: yup.string().required(),
      price: yup.number().integer().required(),
      quantityStock: yup.number().integer().required(),
      file: yup
        .object()
        .shape({
          buffer: yup
            .mixed()
            .test(
              'isBuffer',
              'Buffer is required',
              (value) => value instanceof Buffer
            ),
          mimetype: yup
            .string()
            .oneOf(imageMimeTypes, 'Invalid image mimetype')
            .required(),
        })
        .default(null)
        .nullable(),
    })
  }
}

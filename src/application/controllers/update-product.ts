import { HttpResponse, notFound, ok } from '@/application/helpers/http'
import { Controller } from '@/application/controllers/controller'

import * as yup from 'yup'

type HttpRequest = {
  id: number
  name?: string
  description?: string
  price?: number
  quantityStock?: number
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

type UpdateProduct = (input: {
  id: number
  name?: string
  description?: string
  image?: {
    buffer: Buffer
    mimetype: string
  }
  price?: number
  quantityStock?: number
}) => Promise<
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
  | undefined
>

export class UpdateProductController extends Controller {
  constructor(private readonly update: UpdateProduct) {
    super()
  }

  async execute(req: HttpRequest): Promise<HttpResponse<Model>> {
    const product = await this.update({
      id: Number(req.id),
      name: req.name,
      description: req.description,
      price: Number(req.price),
      quantityStock: Number(req.quantityStock),
      image: req.file?.buffer
        ? { buffer: req.file.buffer, mimetype: req.file.mimetype }
        : undefined,
    })
    return product ? ok(product) : notFound()
  }

  getValidationSchema(): yup.Schema<any> {
    const imageMimeTypes = ['image/jpeg', 'image/png']
    return yup.object().shape({
      id: yup.number().integer().required(),
      name: yup.string().max(128).optional(),
      description: yup.string().optional(),
      price: yup.number().integer().optional(),
      quantityStock: yup.number().integer().optional(),
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

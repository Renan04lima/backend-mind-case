import { HttpResponse, badRequest, created } from '@/application/helpers/http'
import { Controller } from '@/application/controllers/controller'
import { RegisterUser } from '@/domain/use-cases/register-user'

import * as yup from 'yup'

type HttpRequest = {
  name: string
  email: string
  password: string
}
type Model =
  | {
      user: { name: string; email: string }
      token: string
    }
  | Error

export class RegisterUserController extends Controller {
  constructor(private readonly register: RegisterUser) {
    super()
  }

  async execute(req: HttpRequest): Promise<HttpResponse<Model>> {
    const user = await this.register({
      name: req.name,
      email: req.email,
      password: req.password,
    })
    if (user === undefined) return badRequest(new Error('User already exists'))

    return created(user)
  }

  getValidationSchema(): yup.Schema<any> {
    return yup.object().shape({
      name: yup.string().max(128).required(),
      email: yup.string().required(),
      password: yup.string().required(),
    })
  }
}

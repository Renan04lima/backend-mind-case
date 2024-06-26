import { NotFoundError, ServerError, UnauthorizedError } from '../errors/http'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
})

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 201,
  data,
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  data: undefined,
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error,
})

export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError(),
})

export const notFound = (): HttpResponse<Error> => ({
  statusCode: 404,
  data: new NotFoundError(),
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error),
})

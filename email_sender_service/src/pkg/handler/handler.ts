import { RouteHandlerMethod } from 'fastify'

export interface IEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  route: string
  handler: RouteHandlerMethod
}

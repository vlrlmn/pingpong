import { FastifyInstance } from 'fastify'
import { IEndpoint } from '../../pkg/handler/handler'
import sendEmailHandler from './handlers/sendEmail'


const routes: IEndpoint[] = [
  { method: 'POST',route: '/ess/api/rest/email/send',handler: sendEmailHandler},
]

export async function registerRestRoutes(app: FastifyInstance) {
  
  console.log('Registering REST routes...')
  
  for (const route of routes) {
    app.route({
      method: route.method,
      url: route.route,
      handler: route.handler
    })
    console.log(`> ${route.method} ${route.route} --> ${route.handler.name}`)
  }
  console.log("")
}

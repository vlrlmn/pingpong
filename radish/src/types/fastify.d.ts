import 'fastify'
import DatabaseStorage from '../storage/KeyValueStorage'
import IStorage from '../models/storage'

declare module 'fastify' {
  interface FastifyInstance {
    storage: IStorage
  }
  interface FastifyRequest {
    server: FastifyInstance // Make sure this is declared
  }
}
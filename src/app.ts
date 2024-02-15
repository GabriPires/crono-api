import cookies from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { routes } from './http/controllers/routes'

export const app = fastify()

app.register(cors, {
  origin: true,
  credentials: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '15m',
  },
})
app.register(cookies)

app.register(routes)

app.setErrorHandler((error, _, response) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)

    if (error.message) {
      return response.status(400).send({ message: error.message })
    } else {
      return response.status(500).send({ message: 'Internal server error.' })
    }
  } else {
    // TODO: Log error on external service
  }

  return response.status(500).send({ message: 'Internal server error.' })
})

import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
  return { message: 'Hello World' }
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server running! 🚀')
  })

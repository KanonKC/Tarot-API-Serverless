import Fastify from 'fastify'
import { PrimaryCards } from './data/PrimaryCard'

const app = Fastify({
    logger: true,
})

app.get('/', async (req, reply) => {
    const randomCard = PrimaryCards[Math.floor(Math.random() * PrimaryCards.length)]
    return reply.status(200).send(randomCard)
})

export default async function handler(req, reply) {
    await app.ready()
    app.server.emit('request', req, reply)
}
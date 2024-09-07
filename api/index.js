import Fastify from 'fastify'
import { PrimaryCards } from './data/PrimaryCard'
import { readFile } from 'fs'

const app = Fastify({
    logger: true,
})

app.get('/', async (req, reply) => {
    const randomCard = PrimaryCards[Math.floor(Math.random() * 2)]
    return reply.status(200).send(randomCard)
})

// app.get('/card-image/:id', async (req, reply) => {
//     const imagePath = `api/imgs/${req.params.id}.png`
//     readFile(imagePath, (err, data) => {
//         if (err) {
//             console.log("Image not found", err)
//             return reply.status(404).send({ message: 'Image not found' })
//         } else {
//             console.log("Image found", data)
//             return reply.status(201).send(data)
//         }
//     })
// })

export default async function handler(req, reply) {
    await app.ready()
    app.server.emit('request', req, reply)
}
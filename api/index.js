import Fastify from 'fastify'
import { PrimaryCards } from './data/PrimaryCard'
import { readFile } from 'fs'

const app = Fastify({
    logger: true,
})

app.get('/', async (req, reply) => {
    const randomCard = PrimaryCards[Math.floor(Math.random() * PrimaryCards.length)]

    let picturePosition = randomCard.id

    if (randomCard.id >= 19 && randomCard.id <= 21) {
        picturePosition += 1
    }

    const pictureNumber = Math.floor(picturePosition / 8) + 1
    const pictureOneIndex = (picturePosition + 1) % 8

    return reply.status(200).send({...randomCard, pictureNumber, pictureOneIndex})
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
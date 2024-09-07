import Fastify from 'fastify'
import { PrimaryCards } from './data/PrimaryCard'
import { readFile } from 'fs'
import { SecondaryCards } from './data/SecondaryCard'

const app = Fastify({
    logger: true,
})

function getPictureNumberAndIndex(id, diffIdStart, diffIdEnd, pictureNumberOffset) {
    let picturePosition = id

    if (id >= diffIdStart && id <= diffIdEnd) {
        picturePosition += 1
    }

    const pictureNumber = Math.floor(picturePosition / 8) + 1 + pictureNumberOffset
    const pictureOneIndex = (picturePosition + 1) % 8

    return { pictureNumber, pictureOneIndex }
}

app.get('/', async (req, reply) => {

    const randomCard = PrimaryCards[Math.floor(Math.random() * PrimaryCards.length)]
    const randomSecondaryCard = SecondaryCards[Math.floor(Math.random() * SecondaryCards.length)]

    const { pictureNumber, pictureOneIndex } = getPictureNumberAndIndex(randomCard.id, 19, 21, 0)

    const secondaryBody = {
        secondaryId: randomSecondaryCard.id,
        secondaryName: randomSecondaryCard.name,
        secondaryDescription: randomSecondaryCard.description,
        secondaryPictureNumber: Math.floor((randomSecondaryCard.id - 22) / 8) + 4,
        secondaryPictureOneIndex: (randomSecondaryCard.id - 21) % 8,
    }

    return reply.status(200).send({ ...randomCard, pictureNumber, pictureOneIndex, ...secondaryBody })
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
import express, { json, request, response } from "express";

import userRouter from './router/user.mjs'

const app = express();
app.use(express.json())
app.use(userRouter)


const PORT = process.env.PORT || 3000;


// app.get('/api/products', (request, response) => {
//     response.send([
//         {
//             id: '1',
//             ProductName: 'Pritam',
//             Status: 'Processing'
//         },
//         {
//             id: '2',
//             ProductName: 'Jack',
//             Status: 'Delivered'
//         },
//         {
//             id: '3',
//             ProductName: 'Donald',
//             Status: 'Processing'
//         },
//         {
//             id: '4',
//             ProductName: 'Eren',
//             Status: 'On the Way'
//         }
//     ])
// })

app.listen(PORT, () => {
    console.log(`Your Server is running on port ${PORT}`)
})
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;
const mockUsers = [
    {
        id: 1,
        name: 'Pritam',
        Status: 'Active'
    },
    {
        id: 2,
        name: 'Jack',
        Status: 'Active'
    },
    {
        id: 3,
        name: 'Donald',
        Status: 'Active'
    },
    {
        id: 4,
        name: 'Eren',
        Status: 'Inctive'
    }
]

app.get('/', (request, response) => {
    response.status(200).send('hello world')
})
app.get('/api/users', (request, response) => {
    response.send(mockUsers)
})

app.get('/api/users/:id', (request, response) => {
    const parseId = parseInt(request.params.id)
    console.log(request.params)

    const users = mockUsers.find(user => user.id === parseId)

    if (isNaN(parseId)) {
        response.status(400).send('Bad Request. Invalid Id')
    }

    if (!users) {
        response.status(404).send("Users Don't Exist")
    } else {
        response.send(users)
    }
})

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
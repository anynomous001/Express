import express, { json, request, response } from "express";
// import demoUserData from "./data";

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;

const demoUserData = [
    {
        userId: 1,
        userName: 'Pritam',
        userStatus: 'Active',
        age: 25,
        email: 'pritam@example.com',
        location: 'Cityville'
    },
    {
        userId: 2,
        userName: 'Jack',
        userStatus: 'Active',
        age: 30,
        email: 'jack@example.com',
        location: 'Townsville'
    },
    {
        userId: 3,
        userName: 'Donald',
        userStatus: 'Active',
        age: 28,
        email: 'donald@example.com',
        location: 'Villageton'
    },
    {
        userId: 4,
        userName: 'Eren',
        userStatus: 'Inactive',
        age: 22,
        email: 'eren@example.com',
        location: 'Hometown'
    },
    {
        userId: 5,
        userName: 'Sakura',
        userStatus: 'Active',
        age: 26,
        email: 'sakura@example.com',
        location: 'Metropolis'
    },
    {
        userId: 6,
        userName: 'Hinata',
        userStatus: 'Inactive',
        age: 29,
        email: 'hinata@example.com',
        location: 'Suburbia'
    },
    {
        userId: 7,
        userName: 'Naruto',
        userStatus: 'Active',
        age: 31,
        email: 'naruto@example.com',
        location: 'Cityscape'
    },
    {
        userId: 8,
        userName: 'Sasuke',
        userStatus: 'Active',
        age: 27,
        email: 'sasuke@example.com',
        location: 'Downtown'
    }
];

const resolveFindIndex = (request, response, next) => {
    const { params: { id } } = request
    const parseId = parseInt(id)

    if (isNaN(parseId)) return response.status(400).send('Bad Request')

    const findIndex = demoUserData.findIndex((user) => user.userId === parseId)

    if (findIndex == -1) return response.status(404)

    request.findIndex = findIndex
    next()
}

app.get('/', (request, response) => {
    response.statusCode(200).send('hello world')
})

/*Get Request with specific id */

app.get('/api/users', resolveFindIndex, (request, response) => {

    const { query: { filter, value } } = request;

    if (filter && value) {
        // Use dynamic property access to filter users based on the specified property and value
        const filteredUsers = demoUserData.filter(user => user[filter] == value);
        response.send(filteredUsers);
    } else {
        response.send(demoUserData);
    }
});

/*Get Request with specific id */

app.get('/api/users/:id', resolveFindIndex, (request, response) => {
    const { findIndex } = request
    const users = demoUserData[findIndex]
    return response.send(users)
})
/* Post Request */
app.post('/api/users', (request, response) => {
    const { body } = request;
    console.log(body)
    const newUser = {
        userId: demoUserData[demoUserData.length - 1].userId + 1,
        ...body
    };

    demoUserData.push(newUser);
    return response.status(201).send(newUser);
})

/* Put Request */
app.put('/api/users/:id', resolveFindIndex, (request, response) => {
    const { body, findIndex } = request
    demoUserData[findIndex] = { userId: findIndex, ...body }
    return response.sendStatus(200)
})

/* Patch Request */
app.patch('/api/users/:id', resolveFindIndex, (request, response) => {
    const { body, findIndex } = request
    demoUserData[findIndex] = { ...demoUserData[findIndex], ...body }
    return response.sendStatus(202)
})

/* Delete Request */
app.delete('/api/users/:id', resolveFindIndex, (request, response) => {
    const { findIndex } = request
    demoUserData.splice(findIndex, 1)
    return response.sendStatus(200)
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
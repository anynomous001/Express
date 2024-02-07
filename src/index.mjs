import express, { json, request, response } from "express";
import { query, body, validationResult, checkSchema, matchedData } from "express-validator";
import { createvalidationschemas } from "./utils/validationSchemas.mjs";
import { demoUserData } from "./data.mjs ";

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;





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

app.get('/api/users',
    checkSchema(createvalidationschemas),
    (request, response) => {

        const { query: { filter, value } } = request;
        const result = validationResult(request)
        console.log(result.errors)

        if (filter && value) {
            // Use dynamic property access to filter users based on the specified property and value
            const filteredUsers = demoUserData.filter(user => user[filter] == value);
            response.send(filteredUsers);
        }
        if (!result.isEmpty()) response.status(403).send({ errors: result.array() })
    });

/*Get Request with specific id */

app.get('/api/users/:id', resolveFindIndex, (request, response) => {
    const { findIndex } = request
    const users = demoUserData[findIndex]
    return response.send(users)
})
/* Post Request */
app.post('/api/users', checkSchema(createvalidationschemas),
    (request, response) => {

        const result = validationResult(request)


        // console.log(result.errors)


        const { body } = request
        const newUser = {
            userId: demoUserData[demoUserData.length - 1].userId + 1,
            ...body
        };
        console.log(result)

        if (!result.isEmpty()) {
            return response.status(400).send({ error: result.array() })
        }
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
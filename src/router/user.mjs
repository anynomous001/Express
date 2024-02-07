import { Router } from "express";
import { createvalidationschemas } from "../utils/validationSchemas.mjs";
import { checkSchema, validationResult } from "express-validator";
import { resolveFindIndex } from "../utils/middlewares.mjs";
import { demoUserData } from "../utils/data.mjs";


const router = Router();


/*Get Request for home */

router.get('/', (request, response) => {
    response.cookie('hello', 'world', { maxAge: 60000 * 10 })
    response.status(200).send('hello world')
})

/*Get Request with all users */

router.get('/api/users',
    (request, response) => {

        const { query: { filter, value } } = request;
        const result = validationResult(request)
        console.log(result.errors)

        if (filter && value) {
            // Use dynamic property access to filter users based on the specified property and value
            const filteredUsers = demoUserData.filter(user => user[filter] == value);
            response.send(filteredUsers);
        } else {
            return response.status(201).send(demoUserData)
        }
        //Just for only checking validation skill. haha!
        // if (!result.isEmpty()) response.status(403).send({ errors: result.array() })
    });


/*Get Request with specific id */

router.get('/api/users/:id', resolveFindIndex, (request, response) => {
    const { findIndex } = request
    const users = demoUserData[findIndex]
    return response.send(users)
})

/* Post Request */
router.post('/api/users', checkSchema(createvalidationschemas),
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

router.put('/api/users/:id', resolveFindIndex, (request, response) => {
    const { body, findIndex } = request
    demoUserData[findIndex] = { userId: findIndex, ...body }
    return response.sendStatus(200)
})

/* Patch Request */

router.patch('/api/users/:id', resolveFindIndex, (request, response) => {
    const { body, findIndex } = request
    demoUserData[findIndex] = { ...demoUserData[findIndex], ...body }
    return response.sendStatus(202)
})

/* Delete Request */

router.delete('/api/users/:id', resolveFindIndex, (request, response) => {
    const { findIndex } = request
    demoUserData.splice(findIndex, 1)
    return response.sendStatus(200)
})

export default router;
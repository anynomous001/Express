import { Router, request, response } from "express";
import { demoProducts } from "../utils/productData.mjs";
import { resolveFindIndex } from "../utils/middlewares.mjs";
import { checkSchema, validationResult } from "express-validator";
import { createproductvalidationschemas } from "../utils/productvalidation.mjs";


const router = Router();

router.get('/api/products', (request, response) => {
    console.log(request.cookies)
    console.log(request.headers.cookies)
    return response.status(200).send(demoProducts)
})

router.get('/api/products/:id', resolveFindIndex, (request, response) => {
    const { findIndex } = request
    const products = demoProducts[findIndex]
    return response.status(200).send(products)

})


router.post('/api/products', checkSchema(createproductvalidationschemas),
    (request, response) => {

        const result = validationResult(request)
        const { body } = request

        const newProduct = {
            userId: demoProducts[demoProducts.length - 1].id + 1,
            ...body
        };
        console.log(result)

        if (!result.isEmpty()) {
            return response.status(400).send({ error: result.array() })
        }
        demoProducts.push(newProduct);
        return response.status(201).send(newProduct);
    })

export default router
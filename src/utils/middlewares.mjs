export const resolveFindIndex = (request, response, next) => {
    const { params: { id } } = request
    const parseId = parseInt(id)


    if (isNaN(parseId)) return response.status(400).send('Bad Request')

    const findIndex = demoUserData.findIndex((user) => user.userId === parseId)

    if (findIndex == -1) return response.status(404)

    request.findIndex = findIndex
    next()
}
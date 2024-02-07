export const createproductvalidationschemas = {
    ProductName: {
        notEmpty: {
            errorMessage: "User Status can't be Empty",
        },
        isString: {
            errorMessage: "User Status must be a string",
        }
    }
}

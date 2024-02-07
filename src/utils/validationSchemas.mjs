export const createvalidationschemas = {
    userName: {
        isLength: {
            options: {
                min: 3,
                max: 8,
            },
            errorMessage: "UserName must have 3 - 8 characters",
        },
        notEmpty: {
            errorMessage: "User name can't be Empty",
        },
        isString: {
            errorMessage: "User name must be a Empty",
        },
    }


};
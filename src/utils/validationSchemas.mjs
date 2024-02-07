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
            errorMessage: "User Status can't be Empty",
        },
        isString: {
            errorMessage: "User Status must be a Empty",
        },
    },
    userStatus: {
        notEmpty: {
            errorMessage: "User Status can't be Empty",
        },
        isString: {
            errorMessage: "User Status must be a Empty",
        }
    },
    filter: {
        isLength: {
            options: {
                min: 3,
                max: 8,
            },
            errorMessage: "Filter must have 3 - 8 characters",
        },
        notEmpty: {
            errorMessage: "Filter can't be Empty",
        },
        isString: {
            errorMessage: "Filter must  be a string",
        },
    }
};
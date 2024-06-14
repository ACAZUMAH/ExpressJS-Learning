import { isString } from "util";

export const createUserValidationSchama = {
    username: {
        notEmpty: {
            errorMessage: 'Username is required'
        },
        isString: {
            errorMessage: 'Username must be a string'
        },
        isLength: {
            options: { min: 5, max: 32 },
            errorMessage: 'Username must be between 5 to 32 characters long'
        },
    },
    name: {
        notEmpty: true
    }
};
export const queryValidationSchema = {
    filter: {
        notEmpty: {
            errorMessage: 'Filter is required'
        },
        isString: {
            errorMessage: 'Filter must be a string'
        },
    },
    value: {
        notEmpty: {
            errorMessage: 'Value is required'
        },
    }
};

export const loginValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: 'Username is required'
        },
        isString: {
            errorMessage: 'Username must be a string'
        }
    },
    password:{
        notEmpty: {
            errorMessage: 'Password is required'
        }
    }
}
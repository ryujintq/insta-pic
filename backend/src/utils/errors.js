import ErrorResponse from "./errorResponse.js"

export const invalidCredentials = () => {
    return new ErrorResponse('Invalid Credentials', 401)
}

export const noImage = () => {
    return new ErrorResponse('Must select an image to create a post', 400)
}

export const notAuthorized = () => {
    return new ErrorResponse('You must be logged in', 401)
}

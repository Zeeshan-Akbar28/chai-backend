const errorHandler = (statusCode, message, response) => {
    return response.status(statusCode).json({
        message: message
    })

}   

export {errorHandler}
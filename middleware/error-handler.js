import StatusCodes from "http-status-codes";

const errorHandlerMiddleware = (err, req, res) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later"
    };
    // if(err.name === "ValidationError"){
    //     customError.msg
    // }
}


export default errorHandlerMiddleware;
const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    let error = {};
    error.status = err.status ? err.status : 500;
    res.status(error.status).send({
        status: error.status,
        errors: err.errors || [{
            message: "Internal Server Error"
        }]
    });    
}

module.exports = errorMiddleware;
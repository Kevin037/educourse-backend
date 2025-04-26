const logRequest = (req, res, next) => {
    console.log("Terjadi request :"+ req.method, req.url);
    next();
}

module.exports = {logRequest}; 
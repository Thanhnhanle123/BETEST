module.exports.message = (res , status, message, data) =>  {
    return res.status(status).json({ status: status, message: message, data: data });
}
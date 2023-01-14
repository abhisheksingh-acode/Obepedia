const errorResponse = (error, code, message = null) => {
   return {error, code, message};
}

module.exports = errorResponse;
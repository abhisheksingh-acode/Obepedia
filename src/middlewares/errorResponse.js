const errorResponse = (error, code, message = null) => {
   return {error, code, message};
}

export default errorResponse;
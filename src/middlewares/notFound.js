// Simple not found middleware

const notFound = (req,resp)  => {
  resp.status(404).json({
    message:"404 Page Not found"
  })
}


module.exports = notFound ;
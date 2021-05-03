const respond = (response, status, message, data = null) => {
  
    let send = data ? { message, data } : { message }
  
    return response.status(status).json(send)
  }
  
  module.exports = respond
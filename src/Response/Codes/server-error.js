const respond = require('../respond')

const send = (response, message, data) => {
  let code=500

  respond(response, code, message, data)
}
module.exports = send
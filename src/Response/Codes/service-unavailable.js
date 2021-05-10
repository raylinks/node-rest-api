import respond from '../respond'

const send = (response, message, data) => {
  let code=503

  respond(response, code, message, data)
}
module.exports = send
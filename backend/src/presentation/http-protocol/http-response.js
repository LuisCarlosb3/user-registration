export const badRequest = (error) => ({
  statusCode: 400,
  body: error
})
export const serverError = (error) => ({
  statusCode: 500,
  body: error
})
export const noContent = () => ({
  statusCode: 204,
  body: {}
})
export function ExpressRouteAdapterFactory (controller) {
  return async (request, response) => {
    const httpRequest = {
      body: request.body,
      params: request.params
    }
    const httpResponse = await controller.handler(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}

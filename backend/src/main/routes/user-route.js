import { ExpressRouteAdapterFactory } from '../adapter/express-route-adapter'
import { makeUserRegistrationController } from '../factories/user-registration-factory'
export default (router) => {
  router.post('/register', ExpressRouteAdapterFactory(makeUserRegistrationController()))
}
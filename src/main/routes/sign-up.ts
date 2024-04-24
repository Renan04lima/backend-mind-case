import { adaptExpressRoute as adapt } from '@/main/adapters/express-router'
import { makeRegisterUserController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/sign-up', adapt(makeRegisterUserController()))
}

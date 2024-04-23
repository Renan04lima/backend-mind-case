import { adaptExpressRoute as adapt } from '@/main/adapters/express-router'
import { adaptMulter as upload } from '@/main/adapters/multer'
import { makeRegisterProductController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/products', upload, adapt(makeRegisterProductController()))
}

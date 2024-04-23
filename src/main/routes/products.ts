import { adaptExpressRoute as adapt } from '@/main/adapters/express-router'
import { adaptMulter as upload } from '@/main/adapters/multer'
import {
  makeRegisterProductController,
  makeListProductsController,
  makeDeleteProductController,
  makeUpdateProductController,
} from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/products', upload, adapt(makeRegisterProductController()))
  router.get('/products', adapt(makeListProductsController()))
  router.delete('/products/:id', adapt(makeDeleteProductController()))
  router.put('/products/:id', adapt(makeUpdateProductController()))
}

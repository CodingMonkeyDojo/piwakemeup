import express from 'express'
import connections from './connections'
import connectedGpios from './connected-gpios'

let routes = express.Router()

routes.use('/connections', connections)
routes.use('/connected-gpios', connectedGpios)

export default routes
import express from 'express'
import all from './all'
import gpios from './gpios'

let router = express.Router()

router.get('/', all)
router.use('/gpios', gpios)

export default router
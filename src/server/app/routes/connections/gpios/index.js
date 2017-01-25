import express from 'express'
import all from './all'

let router = express.Router({ mergeParams: true })

router.get('/', all)

export default router
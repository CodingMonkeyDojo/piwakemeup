import express from 'express'
import all from './all'

let router = express.Router()

router.get('/', all)

export default router
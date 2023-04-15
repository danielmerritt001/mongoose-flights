import { Router } from 'express'

const router = Router()

// GET localhost:3000/users
router.get('/', function(req, res) {
  res.render('flights/index', { title: 'All Flights' })
})

export { router }

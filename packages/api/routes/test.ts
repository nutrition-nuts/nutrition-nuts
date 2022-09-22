import express from 'express'

const router = express.Router()

// GET /test
router.get('/', async(req, res, next) => {
  const catFact = await (await fetch('https://meowfacts.herokuapp.com/')).json()
  console.log(catFact)

  res.send(catFact)
})

export default router

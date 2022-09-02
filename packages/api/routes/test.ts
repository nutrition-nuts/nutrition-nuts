import express from "express";

const router = express.Router();

//GET /test
router.get("/", (req, res, next) => {
  res.send({randomNumber: Math.random()}) 
})

export default router;

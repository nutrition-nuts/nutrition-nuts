import express from "express";

const router = express.Router();

//GET /test
router.get("/", (req, res, next) => {
  res.send({test: "test"}) 
})

export default router;

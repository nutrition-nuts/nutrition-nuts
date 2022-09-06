import express from "express";

const router = express.Router();

//GET /test
router.get("/", (req, res, next) => {
  res.send({string:"recipe"});
})

export default router;

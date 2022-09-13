import express from "express";
import fetchWorkouts from "../utils/fetchWorkouts.js";
const router = express.Router();

//GET /test
router.get("/Triceps", (req, res, next) => {
  const workoutData = fetchWorkouts("Triceps");
  console.log(workoutData);
  res.send({
    name: workoutData[0].name,
    description: workoutData[0].description,
  });
});

export default router;

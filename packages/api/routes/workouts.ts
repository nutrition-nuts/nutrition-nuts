import express from "express";

const router = express.Router();

//GET /test
router.get("/", (req, res, next) => {
  res.send({
    name: "Leg Press",
    image: "https://legionathletics.com/wp-content/uploads/2022/02/legpress-1.jpg",
    description: "Brace your abdominal muscles and push the platform away with your heels and forefoot. Your heels should remain flat on the footplate. The front of your foot or toes should never be used exclusively to move the pad forward. While exhaling, extend your legs and keep your head and back flat against the seat pad. Extend with slow control rather than with an explosive movement. Pause at the top of the movement. Do not lock out your knees and ensure that they are not bowing out or in. While inhaling, return the footplate to the starting position by gradually bending the knees. Keep the feet and back flat throughout. If you have never done leg presses before, start modestly with three sets of 10 leg presses. You can advance from there as you build strength."
  });
})

export default router;

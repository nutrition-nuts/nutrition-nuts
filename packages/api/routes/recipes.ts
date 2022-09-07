import express from "express";

const router = express.Router();

//GET /test
router.get("/", (req, res, next) => {
    res.send({
        "request":"recipes for the day",
        "breakfast": 
        {
            "name":"Egg and Cheese",
            "ingredients": [
              "2 eggs",
              "shredded cheese"
            ]
        },
       "lunch":
        {
            "name":"Chicken Sandwich",
            "ingredients": [
              "one chicken breast",
              "Burger Bun"
            ]
        },
       "dinner":
        {
            "name":"Pasta Salad",
            "ingredients": [
              "Orzo Pasta",
              "Assortment of veggies",
              "shredded parmesan"
            ]
        },
    });
})

export default router;

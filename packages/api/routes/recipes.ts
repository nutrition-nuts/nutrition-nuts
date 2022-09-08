import express from "express";

const router = express.Router();

//GET /recipes
router.get("/", (req, res, next) => {
    res.send({
        "breakfast": 
        {
            "name":"Eggs and Cheese",
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

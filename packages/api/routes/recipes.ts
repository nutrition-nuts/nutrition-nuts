import express from "express";
import elasticSearchClient from "../elastic/elastic-client";

const router = express.Router();

//GET /recipes
router.get("/", async (req, res, next) => {
  const { query } = req.query;

  //TODO: delete this. just an example of how to hit the elasticsearch from code
  let hit = await elasticSearchClient
    .search({
      index: "recipes",
      query: {
        query_string: {
          query: String(query) ?? "petite",
        },
      },
    })
    .then((value) => value.hits.hits[0] ?? "");

    //default case, give at least something back
    if (!hit) {
      hit = await elasticSearchClient
      .search({
        index: "recipes",
        query: {
          query_string: {
            query: "Vegetable Fried Rice",
          },
        },
      })
      .then((value) => value.hits.hits[0] ?? ""); 
    }

  res.send(hit);
});

export default router;

from api import get_recipe
from githubClient import createEatMeGithubPR
from dataclasses import dataclass
from typing_extensions import TypedDict
import functools
import sys
import getopt

class Recipe(TypedDict):
    name: str
    summary: str
    url: str
    author: str
    ingredients:list[str]
    directions: list[str]
    

def createRecipePr(query, owner, repo):
    recipe = get_recipe(query)

    recipeParsed: Recipe = recipe

    markdown = buildRecipeMarkdown(recipeParsed)

    createEatMeGithubPR(owner, repo, markdown)


def buildRecipeMarkdown(recipe: Recipe):
    newline = '\n'
    return f"""
# {recipe['name']}

## {recipe['summary']}

by {recipe['author']}: {recipe['url']}

## Ingredients:
- {functools.reduce(lambda ingredients, ingredient: ingredients + f"- {ingredient}{newline}", recipe['ingredients'])}

## Directions:
- {functools.reduce(lambda directions, direction: directions + f"- {direction}{newline}", recipe['directions'])}
"""

cliOptions = "ho:r:q:d"
cliOptionsLong = ["help", "owner", "repo", "query"]

if (__name__ == "__main__"):
    argumentList = sys.argv[1:]

    defaultOwner = 'nutrition-nuts'
    defaultRepo = 'nutrition-nuts'
    defaultQuery = 'beans'

    owner = ""
    repo = ""
    query = ""

    try: 
        arguments, values = getopt.getopt(argumentList, cliOptions, cliOptionsLong)
        
        for currentArgument, currentValue in arguments:
            if currentArgument in ("-h", "--help"):
                print("""
Usage: python3 bot.py -o repoOwner -r repo -q query

e.g. > python3 bot.py -o nutrition-nuts -r nutrition-nuts -q beans

-o: the owner of the repo you want to PR against
-r: the repo name
-q: the recipe query we should pull from
                      """)
            
            elif currentArgument in ("-o", "--owner"):
                owner = currentValue
                
            elif currentArgument in ("-r", "--repo"):
                repo = currentValue

            elif currentArgument in ("-q", "--query"):
                query = currentValue

    except getopt.error as err:
        print (str(err)) 


    if (not owner or not repo):
        owner = defaultOwner
        repo  = defaultRepo

    if (not query):
        query = defaultQuery

    createRecipePr(query, owner, repo)

    
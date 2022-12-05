import requests
from dotenv import load_dotenv
import os
import json

load_dotenv()

baseUrl = 'https://api.github.com'

username = 'nutritionnutbot'

token = os.getenv('GITHUB_ACCESS_TOKEN')
header = {'Authorization': 'Bearer ' + token}

def githubDelete(route: str):
    return requests.delete(baseUrl + route, headers = header)

def deleteRepo(repo):
    path =  f'/repos/{username}/{repo}'
    res = githubDelete(path)

    print (res.status_code)
    if (res.status_code >= 400):
        print(path)
        print (json.dumps(res.json()))
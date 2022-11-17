import requests
from dotenv import load_dotenv
import os

load_dotenv()

baseUrl = 'https://api.github.com'

token = os.getenv('GITHUB_ACCESS_TOKEN')
print(token)
header = {'Authorization': 'Bearer ' + token}

def githubPost(route: str, body: object):
    return requests.post(baseUrl + route, json = body, headers = header)


body = {
    "owner": "nutritionnutbot",
    "repo":"test",
    "name": "test",
    "default_branch_only": "true"
}

result = githubPost('/repos/vuejs/vue/forks', body)

print(result.json())
print(result.status_code)
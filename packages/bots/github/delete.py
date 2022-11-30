import requests
from dotenv import load_dotenv
import os

load_dotenv()

baseUrl = 'https://api.github.com'

username = 'nutritionnutbot'

token = os.getenv('GITHUB_ACCESS_TOKEN')
header = {'Authorization': 'Bearer ' + token}

def githubDelete(route: str):
    return requests.delete(baseUrl + route, headers = header)

username = 'nutritionnutbot'
repo = 'nutrition-nuts'

print(githubDelete(f'/repos/{username}/{repo}').status_code)
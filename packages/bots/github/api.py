import requests

BASE_URL = 'https://localhost:7001'

def get_recipe(query):
    r = requests.post('http://localhost:7001/recipes', json={'query': query, 'allergies': [], 'page': 1})
    return r.json()[0][0]

import os
import re
import json
import discord
import requests
from dotenv import load_dotenv

load_dotenv()

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

recipe_regex = re.compile('Give me a.* recipe')
exercise_regex = re.compile('Give me a.* exercise')
stretch_regex = re.compile('Give me a.* stretch')

fname = 'userids.json'

def get_recipe(query):
    r = requests.post('http://localhost:7001/recipes', json={'query': query, 'allergies': [], 'page': 1})
    return r.json()[0][0]

def get_exercise(query):
    r = requests.post('http://localhost:7001/workouts', json={'type': '', 'group': query, 'equip': 'on'})
    return r.json()[0][0]

def get_stretch(query):
    r = requests.post('http://localhost:7001/workouts', json={'type': 'stretch', 'group': query, 'equip': 'on'})
    return r.json()[0][0]

# def get_exercise(query):
#     r = requests.get('http://localhost:7001/workouts', json={'query': query})
#     return r.json()[0][0]

def add_user(user):
    with open(fname) as file:
        users = json.load(file)
    if user in users:
        return "You are already subscribed!"
    users.append(user)
    with open(fname, 'w+') as file:
        json.dump(users, file)
    return "Thanks for subscribing! You will now receive daily meal recipes straight to your DMs!"

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')


@client.event
async def on_message(message):
    if message.author == client.user:
        return

    msg = message.content
    if recipe_regex.match(msg):
        first = get_recipe(msg.split("Give me a")[1].split("recipe")[0].strip())
        print(first)
        await message.reply('**' + first['name'] + '**\n<' + first['url'] + '>\n\nIngredients:\n```' + '\n'.join(
            first['ingredients']) + '```\nRecipe:\n```' + '\n'.join(first['directions']) + '```')
    elif exercise_regex.match(msg):
        first = get_exercise(msg.split("Give me a")[1].split("exercise")[0].strip())
        first['primaryMuscles'] += (first['secondaryMuscles'])
        print(first)
        await message.reply('**' + first['name'] + '**\nhttps://youtube.com/watch?v=' + first['youtubeID'] + '\n\nMuscles Worked:\n```'  +
            '\n'.join(first['primaryMuscles']) + '```\nInstructions:\n```' + '\n'.join(first['instructions']) + '```\n')
    elif stretch_regex.match(msg):
        first = get_stretch(msg.split("Give me a")[1].split("stretch")[0].strip())
        first['primaryMuscles'] += (first['secondaryMuscles'])
        print(first)
        await message.reply('**' + first['name'] + '**\nhttps://youtube.com/watch?v=' + first['youtubeID'] + '\n\nMuscles Stretched:\n```'  +
            '\n'.join(first['primaryMuscles']) + '```\nInstructions:\n```' + '\n'.join(first['instructions']) + '```\n')
    elif msg.lower() == 'subscribe':
        await message.reply(add_user(message.author.id))
        print('Subscribed user ' + message.author.name)

client.run(os.getenv('DISCORD_BOT_TOKEN'))

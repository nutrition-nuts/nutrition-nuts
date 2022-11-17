import discord
from dotenv import load_dotenv
import os
import requests
import re

load_dotenv()

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

regex = re.compile('Give me a.* recipe')


def get_recipe(query):
    r = requests.post('http://localhost:7001/recipes', json={'query': query, 'allergies': [], 'page': 1})
    return r.json()[0][0]


@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')


@client.event
async def on_message(message):
    if message.author == client.user:
        return

    msg = message.content
    if regex.match(msg):
        first = get_recipe(msg.split("Give me a")[1].split("recipe")[0].strip())
        await message.reply(first['name'] + ' ' + first['url'])


client.run(os.getenv('DISCORD_BOT_TOKEN'))

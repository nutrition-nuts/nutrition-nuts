import os
import json
import discord
import requests
from dotenv import load_dotenv

load_dotenv()

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

with open('userids.json') as file:
    user_list = json.load(file)


def get_recipe(query):
    r = requests.post('http://localhost:7001/recipes', json={'query': query, 'allergies': [], 'page': 1})
    return r.json()[0][0]


@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')
    first = get_recipe('')
    for user in user_list:
        uinfo = await client.fetch_user(user)
        uname = uinfo.name
        await send_dm(user, 'Hi, ' + uname + '! Here\'s your daily lunch recipe!\n**' + first['name'] + '**\n<' + first['url'] + '>\n\nIngredients:\n```' + '\n'.join(
            first['ingredients']) + '```\nRecipe:\n```' + '\n'.join(first['directions']) + '```')
    await client.close()


async def send_dm(userid, message):
    discord_user = await client.fetch_user(userid)
    await discord_user.send(message)

client.run(os.getenv('DISCORD_BOT_TOKEN'))

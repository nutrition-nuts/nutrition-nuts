from os import listdir
from os.path import isfile, join
import json
file = open('./recipe-data-test.json')
data = json.load(file)
x = 0
for i in data:
    json_obj = json.dumps(i, indent=4)
    title = i["name"].replace(" ", "-").lower()
    file_name = f"./data/recipes/{title}.json"
    with open(file_name, "w") as outfile:
        outfile.write(json_obj)
    x += 1

file.close()

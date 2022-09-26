from os import listdir
from os.path import isfile, join
import json
exerciseFile = open('./exercises.json')
exersiseData = json.load(exerciseFile)
x = 0
for i in exersiseData['exercises']:
    json_obj = json.dumps(i, indent=4)
    file_name = f"./data/workouts/{x}.json"
    with open(file_name, "w") as outfile:
        outfile.write(json_obj)
    x += 1

exerciseFile.close()

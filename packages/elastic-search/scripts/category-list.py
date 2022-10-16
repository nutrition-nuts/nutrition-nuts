from os import listdir
from os.path import isfile, join
import json
WORKOUT_DIR = "../data/workouts"
uniqueTypes = set()
for filename in listdir(WORKOUT_DIR):
    fileName = join(WORKOUT_DIR, filename)
    file = open(fileName)
    data = json.load(file)
    uniqueTypes.add(data['category'])
print(uniqueTypes)

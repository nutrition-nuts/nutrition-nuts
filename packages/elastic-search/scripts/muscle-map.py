from os import listdir
from os.path import isfile, join
import json
WORKOUT_DIR = "../data/workouts"
uniquePrimaryWorkoutTypes = set()
uniqueSecondaryWorkoutTypes = set()
for filename in listdir(WORKOUT_DIR):
    fileName = join(WORKOUT_DIR, filename)
    file = open(fileName)
    data = json.load(file)
    uniquePrimaryWorkoutTypes.add(data['primaryMuscles'][0])
    secondMuscList = data['secondaryMuscles']
    for muscle in secondMuscList:
        uniqueSecondaryWorkoutTypes.add(muscle)
print(uniquePrimaryWorkoutTypes)
print(uniqueSecondaryWorkoutTypes)

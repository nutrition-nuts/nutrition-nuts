from os import listdir, remove
from os.path import isfile, join
import json
import requests
import config
WORKOUT_DIR = "../data/workouts"
BATCH_LOWER_BOUND = 325
BATCH_SIZE = 25
# current json with id 0 - 349
for filename in listdir(WORKOUT_DIR):
    fileName = join(WORKOUT_DIR, filename)
    fileNumber = filename.split('.')[0]
    if ((int(fileNumber) < BATCH_LOWER_BOUND+BATCH_SIZE) and (int(fileNumber) >= BATCH_LOWER_BOUND)):
        file = open(fileName)
        data = json.load(file)
        workoutName = data['name']
        response = requests.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=how to do ' +
                                workoutName +
                                ' workout&key=' +
                                config.YOUTUBE_API_KEY)
        responseData = response.json()
        videoId = responseData['items'][0]['id']['videoId']
        data['youtubeID'] = videoId

        remove(fileName)
        with open(fileName, 'w') as f:
            json.dump(data, f, indent=4)
            print("---------------------------------")
            print("file number "+fileNumber + " written to")

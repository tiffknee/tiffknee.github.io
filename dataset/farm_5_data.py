import json
import random

obj = json.load(open("updated-file.json"))

for day in obj["results"]:
    for value in day['data']:
        value['statValue'] = int(value ['statValue'])
        if value['register'] == '2014':                                 #temperature
            value['statValue'] += 12
            if random.random > 1.0/20:
                value['statValue'] += random.randint(-10, 10)
        elif value['register'] == "2015":                               #humidity
            value['statValue'] += 60
            if random.random > 1.0 / 15:
                value['statValue'] += random.randint(-5, 5)
        elif (value ['register'] == "2016"):                             #co2
            value['statValue'] += 60
            if (random.random() > 1.0 / 20):
                value ['statValue'] += random.randint(-5, 5)
        elif value ['register'] == "2017":                               #mainPh
            value ['statValue'] -= 7.0
            if random.random() > 1.0 / 10:
                value ['statValue'] += random.randint(-5, 5)
        elif value ['register'] == "2018":                               #mainEc
            value ['statValue'] += 80
            if random.random() > 1.0 / 15:
                value ['statValue'] += random.randint(-10, 10)               
        elif value ['register'] == "2019":                               #mainTemp
            value ['statValue'] += 12
            if random.random() > 1.0 / 10:
                value ['statValue'] += random.randint(-5, 5)
        elif value ['register'] == "2026":                               #seedingPh
            value ['statValue'] -= 7
            if random.random() > 1.0 / 10:
                value ['statValue'] += random.randint(-5, 5)
        elif value ['register'] == "2027":                               #seedingEc
            value ['statValue'] += 80
            if random.random() > 1.0 / 10:
                value ['statValue'] += random.randint(-10, 10)
        elif value ['register'] == "2028":                               #seedingTemp
            value ['statValue'] += 12
            if random.random() > 1.0 / 15:
                value ['statValue'] += random.randint(-10, 10)
        value['statValue'] = str(value['statValue'])

open("farm_5_data.json", "w").write(
    json.dumps(obj, sort_keys=True, indent=4, separators=(',', ': '))
)

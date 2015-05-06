import json

obj = json.load(open("CornerStalk-FarmStat-April-8-to-22.json"))

i = 0
index = []
for day in obj["results"]:
    index.append([])
    j = 0
    for value in day['data']:
        if value['statValue'] == "0" or value['statValue'] == "10000":
            index[i].append(j)
        j += 1
    i += 1

i = 0
for o in index:
    for j in reversed(index[i]):
        del obj["results"][i]["data"][j]
    i+= 1


success = True
for day in obj["results"]:
    for value in day['data']:
        if value['statValue'] == "0" or value['statValue'] == "10000":
            print "unsuccessful"
            success = False
if success:
    print "Success!!!"
    open("updated-file.json", "w").write(
        json.dumps(obj, sort_keys=True, indent=4, separators=(',', ': '))
    )





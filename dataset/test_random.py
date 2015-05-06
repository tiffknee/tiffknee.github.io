import random
import json
from json import dumps

obj = []


filename = 'oneyear_dataset.json'

f = open(filename,'w+')

for i in range (1,360):
	obj_time = []
	for j in range (0, 99):
		plant_name = "plant_%d" % j
		obj_time.append( {
						"plant": plant_name,
						"moisture": random.uniform(0.0, 10.0),
						"temperature": random.uniform(10.0, 30.0),
						"CO2": random.uniform(5.0, 10.0),
						"PH": random.uniform(6.0, 9.0),
						"light": random.uniform(0.0, 1.0)
						})
	name = 'day_%d'  %i
	obj.append( {"day":name, "info": obj_time})
	
jsonString = json.dumps(obj)
	
f.write('%s\n' % jsonString)

f.close()

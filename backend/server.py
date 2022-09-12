# Import flask and datetime module for showing date and time
from distutils.log import Log
from tokenize import String
from flask import Flask, send_from_directory, jsonify, json, request
from pymongo import MongoClient
from bson import json_util
import time
import logging
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__, static_url_path='/static')

logging.basicConfig(filename='record.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

client = MongoClient('localhost', 27017)
db = client.PortefolioDB
translation = db.translation

# Route for seeing a data
@app.route('/translation/<type>', methods=['GET'])
def get_time(type):
	stuff = translation.find({"type": type}).next()
	print(stuff)
	# Returning an api for showing in reactjs
	return parse_json(stuff)
	
@app.route('/man/<hey>', methods=['GET'])
def stff(hey):
	man = "bro"
	manhey = man + ' ' + hey
	return manhey

def parse_json(data):
	return json.loads(json_util.dumps(data))


# Running app
if __name__ == '__main__':
	app.run(debug=True)

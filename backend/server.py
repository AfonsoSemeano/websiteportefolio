# Import flask and datetime module for showing date and time
from distutils.log import Log
from tokenize import String
from flask import Flask, send_from_directory, jsonify, json, request
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from bson import json_util
import time
import logging
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__, static_url_path='/static')
bcrypt = Bcrypt(app)

logging.basicConfig(filename='record.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

client = MongoClient('localhost', 27017)
db = client.PortefolioDB
translation = db.translation

# Route for seeing a data
@app.route('/translation/<type>', methods=['GET'])
def get_time(type):
	stuff = translation.find({"type": type}).next()
	#print(stuff)
	# Returning an api for showing in reactjs
	return parse_json(stuff)

@app.route('/translations', methods=['GET'])
def get_translations():
	rootJson = {}
	translations = translation.find({})
	for document in translations:
		rootJson[document['type']] = document
	
	return parse_json(rootJson)	

def parse_json(data):
	return json.loads(json_util.dumps(data))

#TODO Arranjar maneira de colocar a password encriptada na BD. O username não precisa de ser encriptado.
#TODO Pensar como transformar o utilizador numa entidade na BD.
@app.route('/encrypt/<passe>', methods=['GET'])
def encryptPass(passe):
	pw_hash = bcrypt.generate_password_hash(passe)
	isLegit = bcrypt.check_password_hash(pw_hash, 'hello')
	return parse_json({
		'hashe': pw_hash,
		'isLegit': isLegit
	})

# Running app
if __name__ == '__main__':
	app.run(debug=True)

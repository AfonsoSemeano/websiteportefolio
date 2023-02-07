# Import flask and datetime module for showing date and time
from distutils.log import Log
from http.client import BAD_REQUEST, CONFLICT, FOUND, NOT_ACCEPTABLE, NOT_FOUND, OK
from pydoc import doc
from telnetlib import STATUS
from tokenize import String
from xmlrpc.client import SERVER_ERROR
from flask import Flask, send_from_directory, jsonify, json, request, Response
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from bson import json_util, ObjectId
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
credentials = db.credentials
feedback = db.feedback

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
		'hashe': pw_hash.decode('utf-8'),
		'isLegit': isLegit
	})

@app.route('/findid/<idValue>', methods=['GET', 'POST'])
def findid(idValue):
	rawId = parse_json(credentials.find({"_id": ObjectId(idValue)}).next())['_id']['$oid']
	return bcrypt.generate_password_hash(rawId).decode('utf-8')

@app.route('/credentials/<authType>', methods=['POST'])
def authenticate(authType):
	bodyContent = request.get_json()
	username = bodyContent['username']
	password = bodyContent['password']
	documentAmount = credentials.count_documents({'username': username})
	if authType == 'login': #LOGIN
		if documentAmount == 1:

			credential = credentials.find({'username': username}).next()
			passEnc = credential['passwordEnc']
			if bcrypt.check_password_hash(passEnc, password):
				encId = bcrypt.generate_password_hash(str(credential['_id'])).decode('utf-8')
				return Response(encId, status=OK)
			return Response("Wrong password, please try again.", status=NOT_ACCEPTABLE)

		return Response("Username not found, please register.", status=NOT_FOUND)
	if authType == 'register': #REGISTER

		if documentAmount == 1:
			return Response("Username already exists!", status=CONFLICT)
		if documentAmount == 0:
			pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
			credentials.insert_one({'username': username, 'passwordEnc': pw_hash})
			latestEntry = credentials.find().sort('_id', -1).limit(1).next()
			print(latestEntry['_id'])
			#rawId = parse_json(credentials.find({"_id": ObjectId(latestEntry)}).next())['_id']['$oid']
			encId = bcrypt.generate_password_hash(str(latestEntry['_id'])).decode('utf-8')
			#print(encId)
			return Response(encId, status=OK)

	return Response(status=SERVER_ERROR)

@app.route('/checkobjectid', methods=['POST'])
def checkObjectId():
	objectEncId = request.get_data(as_text=True)
	if objectEncId == '':
		return Response('Id is invalid.', status=NOT_FOUND)
	for document in credentials.find():
		if bcrypt.check_password_hash(objectEncId, str(document['_id'])):
			return Response(document['username'], status=OK)
	return Response('Id is invalid.', status=NOT_FOUND)

@app.route('/giveopinion', methods=['POST'])
def give_feedback():
	bodyContent = request.get_json()
	objectEncId = bodyContent['userId']
	content = bodyContent['content']
	project = bodyContent['project']
	date = bodyContent['date']
	datetime_object = datetime.datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
	for document in credentials.find():
		if bcrypt.check_password_hash(objectEncId, str(document['_id'])):
			feedback.insert_one({'userId': document['_id'], 'content': content, 'project': project, 'date': datetime_object})
			return Response('Opinion added successfully!', status=OK)
	return Response('Id is invalid.', status=NOT_FOUND)

# Running app
if __name__ == '__main__':
	app.run(debug=True)

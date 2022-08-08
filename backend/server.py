# Import flask and datetime module for showing date and time
from flask import Flask, send_from_directory
from pymongo import MongoClient
import logging
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__, static_url_path='/static')

logging.basicConfig(filename='record.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

client = MongoClient('localhost', 27017)
db = client.flask_db
todos = db.todos

# Route for seeing a data
@app.route('/data')
def get_time():

	todos.insert_one({'content': 'WORKED', 'more': 'moreeeeeeeeeee'})
	# Returning an api for showing in reactjs
	return {
		'Name':"geek",
		"Age":"22",
		"Date":x,
		"programming":"python"
		}

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)

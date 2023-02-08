# Welcome

This is my portfolio website.

Keep in mind this is my first website created outside of college, so naturally it might not be in its best conditions. However, I learned a lot with it, so I'm proud enough to share my website's code.

This was created using React-Bootstrap and Flask.

<br>

To run this site you need:

- A mongoDB database with all the translation info
- Install all node packages
- 2 terminals

What to type in these terminals?

Terminal 1: 

* npm start

Terminal 2:

* cd backend

* ./venv/Scripts/activate

* flask run


WHAT TO DO IF YOU ARE IN A DIFFERENT COMPUTER AND YOUR MONGO DATABASE DOESN'T HAVE THE TRANSLATIONS IN IT?

1. Install MongoDB Atlas

2. Create a new database named exactly like this: PortefolioDB

3. Connect to the database and make sure the host is the same as in the line 24 in the server.py file:

```py
client = MongoClient('localhost', 27017)
```

4. Create a new collection in that database with this exact name: translation

5. Go to Add Data, then go to Import file

6. Choose the translations.json file in the project.

And now you should be able to see the translations in my project.

7. If you cant see it, then probably you need to add two more collections:

    * credentials

    * feedback

from flask import Flask
from flask_cors import CORS
from mongoengine import connect
import os
from dotenv import load_dotenv

from api.Page1 import page1Api
from api.Page2 import page2Api
from api.Page3 import page3Api

load_dotenv()

app = Flask(__name__)
CORS(app)

#-----Connect DB-----#
connect(host = os.getenv("MONGO_URL"))
print("DB connected")

#-----Register different API-----#
app.register_blueprint(page1Api, url_prefix='/Page1')
app.register_blueprint(page2Api, url_prefix='/Page2')
app.register_blueprint(page3Api, url_prefix='/Page3')

if __name__ == "__main__":
    print("Start My app for TextDashboard")
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)
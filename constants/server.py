#retrieves data from the db

from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#function to fetch data from SQL
def fetch_data(file, numItems, column_name):
    conn = sqlite3.connect("/Users/mitul/Desktop/spotify/main/data_files/spotify.db")
    cursor = conn.cursor()
    cursor.execute(f'SELECT * FROM {file} ORDER BY "{column_name}" DESC LIMIT {numItems}')
    rows = cursor.fetchall()
    print(column_name)
    data = [{"label": f"{row[0]} - {row[1]}", "value": row[2]} for row in rows]
    #print(data)
    conn.close()
    return data

#API ROute to get data
@app.route("/data", methods=["GET"])
def get_data():
    file = request.args.get("file", "main")  # Default to a table name if not provided
    num_items = int(request.args.get("numItems", 10))  # Default to 10 items if not provided
    column_name = request.args.get("column_name", "Times Played")  # Default to a column name if not provided
    column_name = column_name[1:(len(column_name)-1)]
    return jsonify(fetch_data(file, num_items, column_name))

if __name__ == "__main__":
    app.run(port=5000, debug=True) #run on localhost:5000



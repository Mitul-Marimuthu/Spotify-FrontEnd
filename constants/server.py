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
    images = []
    for row in rows:
        album = row[0]
        cursor.execute(f'SELECT "Image_Info" FROM main WHERE "Album" = ? LIMIT 1', (album,))
        image = cursor.fetchone()
        images.append(image[0])

    #print(column_name)
    data = [{"label": f"{rows[i][0]} - {rows[i][1]}", "value": rows[i][2], "image": images[i]} for i in range(0,len(rows))]
    print(data)
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



# To Run: python3 local_server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('leaderboard.db')
c = conn.cursor()

c.execute('''CREATE TABLE IF NOT EXISTS leaderboard
             (name TEXT, time INTEGER, difficulty TEXT)''')
conn.commit()
conn.close()

@app.route('/')
def home_page():
    return "Hello world!"

@app.route('/ping')
def handle_ping():
    return jsonify({'message':'ok'}), 200

@app.route('/mailbox', methods=['POST'])
def handle_mail():
    conn = sqlite3.connect('leaderboard.db')
    c = conn.cursor()
    try:
        name = request.json['name']
        time = int(request.json['time'])
        difficulty = request.json['difficulty']

        if not name or not time or not difficulty:
            return jsonify({'error': 'Missing JSON data'}), 400
        
        print(name + " got " + str(time) + " on " + difficulty)

        c.execute("INSERT INTO leaderboard (name, time, difficulty) VALUES (?, ?, ?)", (name, time, difficulty))
        conn.commit()
        conn.close()
        return jsonify({'message': (name + " got " + str(time) + " on " + difficulty)}), 200
    
    except Exception as e:
        print(f'An error occurred: {e}')
        conn.close()
        return jsonify({'error': 'Internal Server Error'}), 500
    
@app.route('/leaderboard', methods=['POST'])
def send_leaderboard():
    conn = sqlite3.connect('leaderboard.db')
    c = conn.cursor()
    try:
        c.execute("SELECT name, time, difficulty FROM leaderboard ORDER BY time ASC LIMIT 5")
        rows = c.fetchall()
        conn.close()
        return jsonify({'leaderboard': rows}), 200
    
    except Exception as e:
        print('An error occured', str(e))
        conn.close()
        return jsonify('error', 'internal server error'), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port = 80)
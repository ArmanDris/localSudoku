# To Run: python3 server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('leaderboard.db')
c = conn.cursor()

c.execute('''CREATE TABLE IF NOT EXISTS leaderboard
             (name TEXT, score INTEGER)''')
conn.commit()
conn.close()

# def placeOnLeaderboard(n, s):
#     entry = [n, s]
#     global leaderboard
#     for i in leaderboard:
#         if (s <= i[1]):
#             #want to insert s before i
#             leaderboard.insert(leaderboard.index(i), entry)
#             return
    
    
#     leaderboard.append(entry)
        
        

@app.route('/mailbox', methods=['POST'])
def handle_mail():
    conn = sqlite3.connect('leaderboard.db')
    c = conn.cursor()
    try:
        name = request.json['name']
        score = str(request.json['score'])

        if not name or not score:
            return jsonify({'error': 'Missing JSON data'}), 400
        
        print(name + " got " + score)

        c.execute("INSERT INTO leaderboard (name, score) VALUES (?, ?)", (name, score))
        conn.commit()
        conn.close()
        return jsonify({'message': (name + " got " + score)}), 200
    
    except Exception as e:
        print('An error occured %s', str(e))
        conn.close()
        return jsonify({'error': 'Internal Server Error'}), 500
    
@app.route('/leaderboard', methods=['POST'])
def send_leaderboard():
    conn = sqlite3.connect('leaderboard.db')
    c = conn.cursor()
    try:
        c.execute("SELECT name, score FROM leaderboard ORDER BY score ASC LIMIT 5")
        rows = c.fetchall()
        conn.close()
        return jsonify({'leaderboard': rows}), 200
    
    except Exception as e:
        print('An error occured', str(e))
        conn.close()
        return jsonify('error', 'internal server error'), 500

if __name__ == '__main__':
    app.run()
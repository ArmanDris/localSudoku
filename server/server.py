from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

leaderboard = []

def placeOnLeaderboard(n, s):
    global leaderboard
    for i in leaderboard:
        if (s <= i[1]):
            #want to insert s before i
            leaderboard.insert(leaderboard.index(i), [n, s])
            leaderboard = leaderboard[0:5]
            return
    
    if (len(leaderboard) < 5):
        leaderboard.append([n, s])
        
        

@app.route('/mailbox', methods=['POST'])
def handle_mail():
    try:
        name = request.json['name']
        score = request.json['score']

        if not name or not score:
            return jsonify({'error': 'Missing JSON data'}), 400
        
        print(name + " got " + str(score))
        placeOnLeaderboard(name, score)

        return jsonify({'message': 'Received.'}), 200
    
    except Exception as e:
        print('An error occured %s', str(e))
        return jsonify({'error': 'Internal Server Error'}), 500
    
@app.route('/leaderboard', methods=['POST'])
def send_leaderboard():
    return jsonify({'leaderboard': leaderboard}), 200

if __name__ == '__main__':
    app.run();
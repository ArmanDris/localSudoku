from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

leaderboard = []

def placeOnLeaderboard(s, n):
    global leaderboard
    for i in leaderboard:
        if (s <= i[1]):
            #want to insert s before i
            leaderboard.insert(leaderboard.index(i), [n, s])
            leaderboard = leaderboard[0:5]
            return
    
    if (len(leaderboard) < 5):
        leaderboard.append([n, s])
        
        

@app.route('/leaderboard', methods=['POST'])
def handle_scores():
    score_data = request.get_json()
    name = score_data['name']
    score = score_data['score']
    print(name + " got " + str(score))

    placeOnLeaderboard(score, name)

    response_data = {
        'leaderboard': leaderboard
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run();
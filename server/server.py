from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

scores = []

@app.route('/scores', methods=['POST'])
def handle_scores():
    score_data = request.get_json()
    name = score_data['name']
    score = score_data['score']
    scores.append([name, score])
    print(name + " got " + str(score))

    response_data = {
        'message': 'Score received',
        'leaderboard': [100, 200, 300, 400, 500]
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run();
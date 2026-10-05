from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    result = {
        "fraude": False,
        "score": 0.10
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)


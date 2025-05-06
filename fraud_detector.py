
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load("fraud_model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    prediction = model.predict([data['features']])
    return jsonify({'is_fraud': bool(prediction[0])})

if __name__ == '__main__':
    app.run(port=5000)

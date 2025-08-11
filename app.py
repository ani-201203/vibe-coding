from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Dummy patient data for demonstration
PATIENTS = [
    {"name": "John Doe", "age": 32, "gender": "Male", "diagnosis": "Flu", "admission_date": "2025-08-01"},
    {"name": "Jane Smith", "age": 28, "gender": "Female", "diagnosis": "Appendicitis", "admission_date": "2025-07-30"},
    {"name": "Emily Johnson", "age": 45, "gender": "Female", "diagnosis": "Diabetes", "admission_date": "2025-07-15"}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/patient', methods=['GET'])
def get_patient():
    name = request.args.get('name', '').strip().lower()
    if not name:
        return jsonify({"error": "No patient name provided."}), 400
    results = [p for p in PATIENTS if p['name'].lower() == name]
    if not results:
        return jsonify({"error": "Patient not found."}), 404
    return jsonify(results[0])

if __name__ == '__main__':
    app.run(debug=True)

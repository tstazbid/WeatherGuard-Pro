from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_aqi = pickle.load(open('model\model_aqi','rb'))
model_hsi = pickle.load(open('model\model_hsi','rb'))

@app.route('/update_air_quality', methods=['POST'])
def receive_air_quality_data():
    data = request.get_json()
    
    pm25_concentration = data['pm25']
    pm10_concentration = data['pm10']
    temp = data['temp']
    no2_concentration = data['no2']
    co_concentration = data['co']
    o3_concentration = data['o3']
    wind_speed = data['windSpeed']
    wind_direction = data['windDegree']
    humidity = data['hum']

    # Now you can print or process the received data as needed
    print(f"CO Concentration: {co_concentration}")
    print(f"NO2 Concentration: {no2_concentration}")
    print(f"O3 Concentration: {o3_concentration}")
    print(f"Tempature: {temp}")
    print(f"PM2.5 Concentration: {pm25_concentration}")
    print(f"PM10 Concentration: {pm10_concentration}")
    print(f"Wind Speed: {wind_speed}")
    print(f"Wind Direction: {wind_direction}")
    print(f"Humidity: {humidity}")
    
    
    featuresAQI = np.array([[pm25_concentration, pm10_concentration, temp, no2_concentration, co_concentration, o3_concentration]])
    featuresHSI = np.array([[wind_speed, wind_direction, temp, humidity]])
    
    print(f"AQI Features: {featuresAQI}")
    print(f"HSI Features: {featuresHSI}")

    # Predict using the loaded model
    
    predicted_aqi = model_aqi.predict(featuresAQI)[0]
    print(f"Predicted AQI: {predicted_aqi}")
    
    predicted_hsi = model_hsi.predict(featuresHSI)[0]
    print(f"Predicted HSI: {predicted_hsi}")
    
    # return render_template('resultHandler.js', predictedAQI=predicted_aqi, predictedHSI=predicted_hsi)
    # return "Data received successfully!"
    return jsonify({
        'predicted_aqi': predicted_aqi,
        'predicted_hsi': predicted_hsi
    })

if __name__ == '__main__':
    app.run(debug=True)

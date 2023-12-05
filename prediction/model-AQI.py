# PM25, PM10, Temp, NO2, CO, O3 -> AQI

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle

df = pd.read_csv('dataset\pollutants-and-air-quality-data.csv')

df.drop(['Organisation', 'datetime', 'Device ID', 'Device name', 'PM1 (µg/m³)', 'AQI PM10', 'AQI PM25', 'AQI NO2', 'AQI O3', 'AQI CO', 'Geolocation'], axis=1, inplace=True)
df.dropna(inplace = True)

X = df.drop('AQI Max',axis=1)
y = df['AQI Max']

from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=0)

from sklearn import metrics

def predict(ml_model):
    model = ml_model.fit(X_train,y_train)
    print(model)
    #print('Training score : ',model.score(X_train,y_train))
    #y_prediction=model.predict(X_test)
    #print('predictions are: \n',y_prediction)
    #accuracy = metrics.r2_score(y_test,y_prediction)
    #print('accuracy: ',accuracy * 100.0)
    #sns.histplot(y_test-y_prediction)

from sklearn.ensemble import RandomForestRegressor
randomForest = RandomForestRegressor();
predict(randomForest)

pickle.dump(randomForest, open('model\model_aqi', 'wb'))
model = pickle.load(open('model\model_aqi', 'rb'))


# Wind speed(m/s), Wind Direction, Temp, Humidity -> Heat Stress Index

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle

df= pd.read_csv('dataset\local-weather-data-from-environmental-sensors.csv')

df.drop(['Organisation', 'Device name', 'time', 'Precipitation (mm)', 'Radiation (W/m2)', 'Gust speed (m/s)', 'Gust direction (°)', 'Brightness', 'Air pressure (hPa)', 'UV index', 'device_label', 'skip_record_flag', 'Geolocation'], axis=1, inplace=True)
df.dropna(inplace = True)

X = df.drop('Heat Stress Index',axis=1)
y = df['Heat Stress Index']

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

pickle.dump(randomForest, open('model\model_hsi', 'wb'))
model = pickle.load(open('model\model_hsi', 'rb'))
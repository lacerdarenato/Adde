from flask import Flask
from flask_restful import Resource, Api
import requests


app = Flask(__name__)
api = Api(app)


class Weather(Resource):

    def get(self, city, state):
        parametros = {'city': city,
                      'state': state,
                      'lang': 'pt',
                      'key': '258eae717aea45d39177786791a48fc7'}
        currentWeatherJson = requests.get(
            'https://api.weatherbit.io/v2.0/current', params=parametros).json()

        temperature = currentWeatherJson['data'][0]['temp']
        city_name = currentWeatherJson['data'][0]['city_name']
        weatherDescription = currentWeatherJson['data'][0]['weather']['description']
        icon = currentWeatherJson['data'][0]['weather']['icon']

        currentWeatherObject = {
            'temperature': temperature,
            'city_name': city_name,
            'weatherDescription': weatherDescription,
            'icon': icon
        }

        return currentWeatherObject


api.add_resource(Weather, '/weather/<string:city>/<string:state>')

if __name__ == '__main__':
    app.run(port=5002)

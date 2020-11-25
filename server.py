from flask import Flask
from flask_restful import Resource, Api
import requests
from requests import get


app = Flask(__name__)
api = Api(app)


class Weather(Resource):

    def get(self, city, state):
        parametros = {'city': city,
                      'state': state,
                      'lang': 'pt',
                      'key': '258eae717aea45d39177786791a48fc7'}
        req = requests.get(
            'https://api.weatherbit.io/v2.0/current', params=parametros)
        print(req.url)
        return req.json()


class WeatherIP(Resource):

    def get(self):
        ip = get('https://api.ipify.org').text

        parametros = {
            'ip': ip,
            'lang': 'pt',
            'key': '258eae717aea45d39177786791a48fc7'}

        return requests.get('https://api.weatherbit.io/v2.0/current', params=parametros).json()


class ForecastWeatherForDays(Resource):

    def get(self, city, country, days):
        parametros = {'city': city,
                      'country': country,
                      'days': days,
                      'lang': 'pt',
                      'key': '258eae717aea45d39177786791a48fc7'}
        return requests.get(
            'https://api.weatherbit.io/v2.0/forecast/daily', params=parametros).json()


api.add_resource(Weather, '/weather/<string:city>/<string:state>')
api.add_resource(WeatherIP, '/weatherIP')
api.add_resource(ForecastWeatherForDays,
                 '/forecastWeather/<string:city>/<string:country>/<string:days>')


if __name__ == '__main__':
    app.run(port=5002)

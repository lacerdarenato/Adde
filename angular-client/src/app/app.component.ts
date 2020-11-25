import { Component, OnInit } from "@angular/core";
import { WeatherService } from "./services/weather.service";
import { currentWeather } from "./models/currentWeather";
import { weatherList } from "./models/weatherList";
import { requestCurrentWeather } from './models/requestCurrentWeather';
import { requestForecastWeatherList } from './models/requestForecastWeatherList';
import { requestWeatherForIP } from './models/requestWeatherForIP';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  currentWeather = {} as currentWeather;
  weatherList: weatherList[] = [];
  entriesNewWeatherList = {} as any;
  requestCurrentWeather = {} as requestCurrentWeather;
  requestForecastWeatherList = {} as requestForecastWeatherList;
  requestWeatherForIP = {} as requestWeatherForIP;

  showCurrentWeather: Boolean = false;
  showForecastWeather: Boolean = false;

  constructor(private WeatherService: WeatherService) { }

  ngOnInit() {
    this.getWeatherForIP();
  }

  getCurrentWeather() {
    this.showCurrentWeather = false;
    this.WeatherService.getCurrentWeather(
      this.requestCurrentWeather.city,
      this.requestCurrentWeather.state).subscribe(
        (newCurrentWeather: any) => {
          this.currentWeather = {
            temp: newCurrentWeather.data[0].temp,
            city_name: newCurrentWeather.data[0].city_name,
            weather: newCurrentWeather.data[0].weather
          };
          this.showCurrentWeather = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getWeatherForIP() {
    this.showCurrentWeather = false;
    this.WeatherService.getWeatherForIP().subscribe(
      (newCurrentWeather: any) => {
        this.currentWeather = {
          temp: newCurrentWeather.data[0].temp,
          city_name: newCurrentWeather.data[0].city_name,
          weather: newCurrentWeather.data[0].weather
        };
        this.showCurrentWeather = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getForecastWeather() {
    this.showForecastWeather = false;
    this.WeatherService.getForecastWeather(
      this.requestForecastWeatherList.city,
      this.requestForecastWeatherList.country,
      this.requestForecastWeatherList.days).subscribe(
        (newWeatherList: any) => {
          this.weatherList = newWeatherList.data
          this.showForecastWeather = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

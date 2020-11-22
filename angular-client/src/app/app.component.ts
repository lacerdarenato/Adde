import { Component } from "@angular/core";
import { FuncionarioService } from "./services/funcionario.service";
import { currentWeather } from "./models/currentWeather";
import { weatherList } from "./models/weatherList";
import { requestCurrentWeather } from './models/requestCurrentWeather';
import { requestForecastWeatherList } from './models/requestForecastWeatherList'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  currentWeather = {} as currentWeather;
  weatherList: weatherList[] = [];
  requestCurrentWeather = {} as requestCurrentWeather;
  requestForecastWeatherList = {} as requestForecastWeatherList;

  MostrarLista: Boolean = true;

  constructor(private FuncionarioService: FuncionarioService) { }

  getCurrentWeather() {
    this.FuncionarioService.getCurrentWeather(
      this.requestCurrentWeather.city,
      this.requestCurrentWeather.state).subscribe(
        (currentWeather: currentWeather) => {
          this.currentWeather = currentWeather;
        }
      );
  }

  getForecastWeather() {
    this.FuncionarioService.getForecastWeather(
      this.requestForecastWeatherList.city,
      this.requestForecastWeatherList.country,
      this.requestForecastWeatherList.days).subscribe(
        (weatherList: weatherList[]) => {
          this.weatherList = weatherList;
          this.MostrarLista = true;
        }
      );
  }
}

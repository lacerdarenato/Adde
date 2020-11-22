import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { currentWeather } from "../models/currentWeather";
import { weatherList } from "../models/weatherList";

@Injectable({
  providedIn: "root",
})
export class FuncionarioService {
  url = "http://localhost:4200/api/weather/";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  getCurrentWeather(city: string, state: string): Observable<currentWeather> {
    return this.httpClient.get<currentWeather>(this.url + city + "/" + state).pipe(retry(2));
  }

  getForecastWeather(city: string, country: string, days: string): Observable<weatherList[]> {
    return this.httpClient
      .get<weatherList[]>(this.url + "/forecastWeather/" + city + "/" + country + "/" + days)
      .pipe(retry(2));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
  }
}

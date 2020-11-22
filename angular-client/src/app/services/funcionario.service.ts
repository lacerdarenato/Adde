import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { currentWeather } from "../models/currentWeather";

@Injectable({
  providedIn: "root",
})
export class FuncionarioService {
  url = "http://localhost:4200/api/funcionario";

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  getFuncionarios(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.url).pipe(retry(2));
  }

  getFuncionariosPorNome(nome: string): Observable<Funcionario> {
    return this.httpClient
      .get<Funcionario>(this.url + "/nome/" + nome)
      .pipe(retry(2));
  }

  getFuncionariosPorCpf(doc: string): Observable<Funcionario> {
    return this.httpClient
      .get<Funcionario>(this.url + "/cpf/" + doc)
      .pipe(retry(2));
  }

  getFuncionariosPorCargo(cargo: string): Observable<Funcionario[]> {
    return this.httpClient
      .get<Funcionario[]>(this.url + "/cargo/" + cargo)
      .pipe(retry(2));
  }

  getFuncionariosPorSalario(
    min: number,
    max: number
  ): Observable<Funcionario[]> {
    return this.httpClient
      .get<Funcionario[]>(this.url + "/faixaSalarial/" + min + "/" + max)
      .pipe(retry(2));
  }

  getFuncionarioPorStatus(status: string): Observable<Funcionario[]> {
    return this.httpClient
      .get<Funcionario[]>(this.url + "/Status/" + status)
      .pipe(retry(2));
  }

  // salva um Funcionarioro
  saveFuncionario(Funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient
      .post<Funcionario>(
        this.url,
        JSON.stringify(Funcionario),
        this.httpOptions
      )
      .pipe(retry(2));
  }

  // utualiza um Funcionarioro
  updateFuncionario(Funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient
      .put<Funcionario>(
        this.url + "/" + Funcionario.Cpf,
        JSON.stringify(Funcionario),
        this.httpOptions
      )
      .pipe(retry(1));
  }

  // deleta um Funcionarioro
  deleteFuncionario(Funcionario: Funcionario) {
    return this.httpClient
      .delete<Funcionario>(this.url + "/" + Funcionario.Cpf, this.httpOptions)
      .pipe(retry(1));
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

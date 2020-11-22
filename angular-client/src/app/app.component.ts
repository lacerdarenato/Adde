import { Component, OnInit } from "@angular/core";
import { FuncionarioService } from "./services/Funcionario.service";
import { currentWeather } from "./models/currentWeather";
import { NgForm } from "@angular/forms";
import { weatherList } from "./models/weatherList";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  Funcionario = {} as Funcionario;
  faixaSalarial = {} as faixaSalarial;
  Funcionarios: Funcionario[];
  FuncionariosPorCpf: Funcionario;
  FuncionarioPorNome: Funcionario;
  listaFuncionarios: Funcionario[] = [];
  ListaFuncionariosPorSalario: Funcionario[] = [];
  ListaFuncionariosPorCargo: Funcionario[] = [];
  ListaFuncionariosPorStatus: Funcionario[] = [];
  MostrarLista: Boolean = true;

  constructor(private FuncionarioService: FuncionarioService) { }

  ngOnInit() {
    this.getFuncionarios();
  }

  // defini se um Funcionarioro será criado ou atualizado
  saveFuncionario(form: NgForm) {
    if (
      this.listaFuncionarios.find((item) => item.Cpf == this.Funcionario.Cpf)
    ) {
      this.FuncionarioService.updateFuncionario(this.Funcionario).subscribe(
        () => {
          this.cleanForm(form);
        }
      );
    } else {
      this.FuncionarioService.saveFuncionario(this.Funcionario).subscribe(
        () => {
          this.cleanForm(form);
        }
      );
    }
  }

  // Chama o serviço para obtém todos os Funcionarioros
  getFuncionarios() {
    this.FuncionarioService.getFuncionarios().subscribe(
      (Funcionarios: Funcionario[]) => {
        this.Funcionarios = Funcionarios;
        this.listaFuncionarios = Funcionarios;
      }
    );
  }

  getFuncionarioNome() {
    this.FuncionarioService.getFuncionariosPorNome(
      this.Funcionario.Nome
    ).subscribe((Funcionarios: Funcionario) => {
      this.FuncionarioPorNome = Funcionarios;
      this.MostrarLista = true;
    });
  }

  getFuncionarioCpf() {
    this.FuncionarioService.getFuncionariosPorCpf(
      this.Funcionario.Cpf
    ).subscribe((Funcionarios: Funcionario) => {
      this.FuncionariosPorCpf = Funcionarios;
      this.MostrarLista = true;
    });
  }

  getFuncionarioPorCargo() {
    this.FuncionarioService.getFuncionariosPorCargo(
      this.Funcionario.Cargo
    ).subscribe((Funcionarios: Funcionario[]) => {
      this.ListaFuncionariosPorCargo = Funcionarios;
      this.MostrarLista = true;
    });
  }

  getFuncionarioPorSalario() {
    this.FuncionarioService.getFuncionariosPorSalario(
      this.faixaSalarial.min,
      this.faixaSalarial.max
    ).subscribe((Funcionarios: Funcionario[]) => {
      this.ListaFuncionariosPorSalario = Funcionarios;
      this.MostrarLista = true;
    });
  }

  getFuncionarioPorStatus() {
    this.FuncionarioService.getFuncionarioPorStatus(
      this.Funcionario.Status
    ).subscribe((Funcionarios: Funcionario[]) => {
      this.ListaFuncionariosPorStatus = Funcionarios;
      this.MostrarLista = true;
    });
  }

  // deleta um Funcionarioro
  deleteFuncionario(Funcionario: Funcionario) {
    this.FuncionarioService.deleteFuncionario(Funcionario).subscribe(() => {
      this.MostrarLista = false;
    });
  }

  // copia o Funcionarioro para ser editado.
  editFuncionario(Funcionario: Funcionario) {
    this.Funcionario = { ...Funcionario };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    // this.getFuncionarios();
    form.resetForm();
  }
}

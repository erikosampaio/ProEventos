import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
  // providers: [EventoService]
})
export class EventosComponent implements OnInit {

  constructor(private eventoService: EventoService) { }

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  private filtroListado: string = '';

  public larguraImagem: number = 200;
  public margemImagem: number = 2;
  public exibirImagem: boolean = false;

  public ngOnInit(): void {
    this.getEventos();
  }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroListado ? this.filtrarEventos(this.filtroListado) : this.eventos;
  }

  public alternarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => console.log(error)
    });
  }
}

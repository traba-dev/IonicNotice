import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public noticias: Article[] = [];
  constructor(private noticiaService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }
  loadData(event: any) {
    this.cargarNoticias(event);
  }
  cargarNoticias(event?) {
    this.noticiaService.getTopHeadLines().subscribe(
      response => {
        if (response.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.noticias.push(...response.articles);
        if (event) {
            // tslint:disable-next-line: no-unused-expression
            event.target.complete();
        }
      }, err => {
        console.log(`error: ${JSON.stringify(err)}`);
      });
  }
}

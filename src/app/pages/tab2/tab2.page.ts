import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public categorias: string[] = [];
  public noticias: Article[] = [];

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.categorias.push('business');
    this.categorias.push('entertainment');
    this.categorias.push('general');
    this.categorias.push('health');
    this.categorias.push('science');
    this.categorias.push('sports');
    this.categorias.push('technology');
    this.segment.value = this.categorias[0];

    this.cambioNoticia(this.categorias[0]);
  }

  cambioCategoria(evento: any) {
    this.noticias = [];
    this.cambioNoticia(evento.detail.value);
  }

  cambioNoticia(categoria: any, evento?: any) {
    this.noticiasService.getTopHeadLinesCategories(categoria).subscribe(
      response => {
        this.noticias.push(...response.articles);
        if (evento) {
          evento.target.complete();
        }
      }, err => {
        console.log(err);
      }
    );
  }
  loadData(event: any) {
    this.cambioNoticia(this.segment.value, event);

  }
}

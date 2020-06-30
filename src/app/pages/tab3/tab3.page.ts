import { Component, OnInit } from '@angular/core';
import { DatalocalService } from '../../datalocal.service';
import { log } from 'util';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public noticias: Article[] = [];
  constructor(public datalocal: DatalocalService) {
   this.cargarFavoritos().then((result) => {
     this.noticias = result;
   }).catch((err) => {
     console.log(err);
   });
  }

  cargarFavoritos() {
   return this.datalocal.cargarNoticias();
  }
  ngOnInit() {
    this.cargarFavoritos().then((result) => {
      this.noticias = result;
    }).catch((err) => {
      console.log('error');
    });
  }
}
